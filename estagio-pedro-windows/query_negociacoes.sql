SELECT c.id, c.razao, 
	cc.id, 
	cc.contrato, 
	crm.ultima_atualizacao, 
	assu.assunto, 
	su.data_criacao, 
CASE 
	WHEN tcc.contratos = 1 THEN 'Cliente novo.'
	ELSE 'Cliente antigo.'
END AS contratos, 
CASE 
	WHEN COUNT(fnr.id) >= 1 THEN CONCAT(COUNT(fnr.id), ' parcela paga.')
	ELSE 'Não pago.'
END AS parcelas
FROM cliente c 
INNER JOIN cliente_contrato cc ON cc.id_cliente=c.id
INNER JOIN crm_negociacoes crm ON crm.id_contrato=cc.id
INNER JOIN su_ticket su ON su.id_contrato=cc.id
INNER JOIN su_oss_assunto assu ON su.id_assunto=assu.id
LEFT JOIN (
	SELECT c.id AS id_cliente, COUNT(cc.`id`) AS contratos FROM cliente c 
	INNER JOIN cliente_contrato cc ON cc.`id_cliente`=c.`id` GROUP BY c.`id`
	) AS tcc ON tcc.id_cliente=c.`id`
LEFT JOIN (
	SELECT fn.id, fn.id_contrato, fn.id_contrato_avulso FROM fn_areceber fn WHERE fn.status = 'R'
	) AS fnr ON (fnr.id_contrato = cc.id OR fnr.id_contrato_avulso = cc.id)
WHERE crm.ultima_atualizacao >= '2024-10-01 00:00:00' 
AND su.data_criacao = crm.ultima_atualizacao 
GROUP BY c.id
ORDER BY crm.`ultima_atualizacao` DESC