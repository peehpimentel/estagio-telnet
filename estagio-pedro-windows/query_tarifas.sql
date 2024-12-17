-- tarifa_pag_bol
WITH taxa_boleto AS (

	SELECT 
	rec.id_receber AS id, alt.id_carteira_old, alt.id_carteira_new, cnt.tipo_conta, fn.forma_recebimento, 
	rec.valor_liquido_recebido, CONCAT('R$', REPLACE(ROUND(rec.valor_liquido_recebido - 1.11, 2), '.', ','), ' - Apenas boleto.') AS taxa_boleto, 
	fn.id_carteira_cobranca
	FROM fn_areceber fn 
	INNER JOIN fn_movim_finan rec ON rec.id_receber=fn.id
	LEFT JOIN fn_areceber_alt_carteira alt ON alt.id_areceber = fn.id
	INNER JOIN contas cnt ON cnt.id=rec.conta_
	WHERE rec.tipo_recebimento = 'B' AND alt.id_carteira_old IS NULL AND alt.id_carteira_new IS NULL 
	AND cnt.tipo_conta = 'B' AND fn.forma_recebimento = 'R' AND fn.tipo_recebimento = 'Boleto' 
	AND fn.id_carteira_cobranca IN (1, 3, 4, 33, 34, 36)

),
-- tarifa_pix
taxa_pix AS (

	SELECT 
	rec.id_receber, rec.tipo_recebimento, alt.id_carteira_old, alt.id_carteira_new, cnt.tipo_conta, fn.forma_recebimento, 
	rec.valor_liquido_recebido, CONCAT('R$', REPLACE(ROUND(rec.valor_liquido_recebido - 0.40, 2), '.', ','), ' - Apenas PIX.') AS taxa_pix, 
	fn.id_carteira_cobranca
	FROM fn_areceber fn 
	INNER JOIN fn_movim_finan rec ON rec.id_receber=fn.id
	LEFT JOIN fn_areceber_alt_carteira alt ON alt.id_areceber = fn.id
	INNER JOIN contas cnt ON cnt.id=rec.conta_
	WHERE rec.tipo_recebimento = 'P' AND alt.id_carteira_old IS NULL AND alt.id_carteira_new IS NULL 
	AND cnt.tipo_conta IN ('B') AND fn.forma_recebimento IN ('M', 'R') AND fn.tipo_recebimento = 'Pix' 
	AND fn.id_carteira_cobranca IN (38, 41, 42, 43, 44, 47) 
),
-- tarifa_total_pix
taxa_boleto_pix AS (

	SELECT 
	rec.id_receber, rec.tipo_recebimento, alt.id_carteira_old, alt.id_carteira_new, cnt.tipo_conta, fn.forma_recebimento, 
	rec.valor_liquido_recebido, CONCAT('R$', REPLACE(ROUND(rec.valor_liquido_recebido - 1.48, 2), '.', ','), ' - Boleto para PIX.') AS taxa_boleto_pix
	FROM fn_areceber fn 
	INNER JOIN fn_movim_finan rec ON rec.id_receber=fn.id
	LEFT JOIN fn_areceber_alt_carteira alt ON alt.id_areceber = fn.id
	INNER JOIN contas cnt ON cnt.id=rec.conta_
	WHERE rec.tipo_recebimento = 'P' AND alt.id_carteira_old IN (1, 3, 4, 33, 34, 36) AND alt.id_carteira_new IN (38, 41, 42, 43, 44, 47)
	AND alt.id_carteira_old IS NOT NULL AND alt.id_carteira_new IS NOT NULL 
	AND cnt.tipo_conta = 'B' AND fn.forma_recebimento = 'R' AND fn.tipo_recebimento = 'Pix' 
	AND fn.id_carteira_cobranca IN (38, 41, 42, 43, 44, 47) 
),
-- tarifa_baixa_bol
taxa_baixa_boleto AS (

	SELECT 
	rec.id_receber, rec.tipo_recebimento, alt.id_carteira_old, alt.id_carteira_new, cnt.tipo_conta, fn.forma_recebimento, 
	rec.valor_liquido_recebido, CONCAT('R$', REPLACE(ROUND(rec.valor_liquido_recebido - 1.08, 2), '.', ','), ' - Boleto pago por fora.') 
	AS taxa_baixa_boleto
	FROM fn_areceber fn 
	INNER JOIN fn_movim_finan rec ON rec.id_receber=fn.id
	LEFT JOIN fn_areceber_alt_carteira alt ON alt.id_areceber = fn.id
	INNER JOIN contas cnt ON cnt.id=rec.conta_
	WHERE rec.tipo_recebimento NOT IN ('B') AND alt.id_carteira_old IS NULL AND alt.id_carteira_new IS NULL 
	AND cnt.tipo_conta IN ('C', 'B') AND fn.forma_recebimento IN ('M', 'R') AND fn.tipo_recebimento IN ('Boleto') 
	AND fn.id_carteira_cobranca IN (1, 3, 4, 33, 34, 36)	
),
-- sem tarifa
taxa_zero AS (
	SELECT 
	rec.id_receber, rec.tipo_recebimento, alt.id_carteira_old, alt.id_carteira_new, cnt.tipo_conta, fn.forma_recebimento, 
	rec.valor_liquido_recebido, CONCAT('R$', REPLACE(ROUND(rec.valor_liquido_recebido, 2), '.', ','), ' - Pagamento por fora.') AS taxa_zero
	FROM fn_areceber fn 
	INNER JOIN fn_movim_finan rec ON rec.id_receber=fn.id
	LEFT JOIN fn_areceber_alt_carteira alt ON alt.id_areceber = fn.id
	INNER JOIN contas cnt ON cnt.id=rec.conta_
	WHERE rec.tipo_recebimento NOT IN ('B, P') AND alt.id_carteira_old IS NULL 
	AND alt.id_carteira_new IS NULL
	AND cnt.tipo_conta = 'C' AND fn.forma_recebimento = 'M' AND fn.tipo_recebimento IN ('Pix') 
	AND fn.id_carteira_cobranca IN (38, 41, 42, 43, 44, 47) 
)

SELECT 	
	c.id,
	c.razao AS nome_cliente,
	fn.id AS id_finanças,
	fn.data_vencimento,
	fn.pagamento_data,
	REPLACE(CONCAT('R$', FORMAT(fn.valor, 2)), '.', ',') AS valor_total,
CASE
	WHEN rec.valor_liquido_recebido < fn.`valor` THEN REPLACE(CONCAT('-R$', FORMAT(rec.vdesconto, 2)), '.', ',')
	WHEN rec.valor_liquido_recebido > fn.`valor` THEN REPLACE(CONCAT('+R$', FORMAT(rec.vacrescimo, 2)), '.', ',')
	ELSE REPLACE(CONCAT('R$', 0.00), '.', ',')
END AS desconto_acrescimo,
	REPLACE(CONCAT('R$', FORMAT(rec.valor_liquido_recebido, 2)), '.', ',') AS valor_liquido_recebido,
CASE
	WHEN taxa_boleto IS NOT NULL THEN REPLACE(CONCAT('-R$', 1.11), '.', ',')
	WHEN taxa_pix IS NOT NULL THEN REPLACE(CONCAT('-R$', 0.40), '.', ',')
	WHEN taxa_boleto_pix IS NOT NULL THEN REPLACE(CONCAT('-R$', 1.48), '.', ',')
	WHEN taxa_baixa_boleto IS NOT NULL THEN REPLACE(CONCAT('-R$', 1.08), '.', ',')
	WHEN taxa_zero IS NOT NULL THEN REPLACE(CONCAT('R$', 0.00), '.', ',')
	ELSE REPLACE(CONCAT('R$', 0.00), '.', ',')
END AS valor_tarifas, 
CASE
	WHEN taxa_boleto IS NOT NULL THEN taxa_boleto
	WHEN taxa_pix IS NOT NULL THEN taxa_pix
	WHEN taxa_boleto_pix IS NOT NULL THEN taxa_boleto_pix
	WHEN taxa_baixa_boleto IS NOT NULL THEN taxa_baixa_boleto
	WHEN taxa_zero IS NOT NULL THEN taxa_zero
	ELSE REPLACE(CONCAT('R$', rec.valor_liquido_recebido, ' - sem tarifa, carteira diferente.'), '.', ',')
END AS valor_recebido_taxa
FROM cliente c
INNER JOIN fn_areceber fn ON fn.id_cliente = c.id
LEFT JOIN taxa_boleto tb ON tb.id = fn.id
LEFT JOIN taxa_pix tp ON tp.id_receber = fn.id
LEFT JOIN taxa_boleto_pix tbp ON tbp.id_receber = fn.id
LEFT JOIN taxa_baixa_boleto tbb ON tbb.id_receber = fn.id
LEFT JOIN taxa_zero tz ON tz.id_receber = fn.id
INNER JOIN fn_movim_finan rec ON rec.id_receber=fn.id
WHERE fn.pagamento_data >= '2024-10-01' AND fn.filial_id = 1 
AND fn.forma_recebimento IS NOT NULL
GROUP BY c.id
ORDER BY fn.id