-- 

-- SELECT f.funcionario, COUNT(os.id) FROM funcionarios f INNER JOIN su_oss_chamado os ON os.id_tecnico = f.id AND os.status = 'AG' AND f.id_setor_padrao IN (25, 26) GROUP BY f.id
-- 
-- SELECT f.funcionario, COUNT(os.id) AS ordens_count, prioridade FROM funcionarios f INNER JOIN su_oss_chamado os ON os.id_tecnico = f.id AND os.status = 'AG' AND f.id_setor_padrao IN (25, 26) GROUP BY f.id
--   ORDER BY 
--     ordens_count ASC, 
--     CASE 
--       WHEN prioridade = 'C' THEN 1
--       WHEN prioridade = 'A' THEN 2
--       WHEN prioridade = 'N' THEN 3
--       WHEN prioridade = 'B' THEN 4
--       ELSE 5 
--     END ASC
--   LIMIT 10

WITH Tecnicos AS (
  SELECT id_tecnico, COUNT(id) AS ordem_count
  FROM su_oss_chamado
  WHERE id_tecnico IN (
    SELECT id
    FROM funcionarios
    WHERE id_setor_padrao IN (25, 26) AND ativo = 'S'
  )
  GROUP BY id_tecnico
),
Prioridades AS (
  SELECT id_tecnico,
         CASE
           WHEN prioridade = 'C' THEN 1
           WHEN prioridade = 'A' THEN 2
           WHEN prioridade = 'N' THEN 3
           WHEN prioridade = 'B' THEN 4
           ELSE 5
         END AS prioridade_order
  FROM su_oss_chamado
)
SELECT T.id_tecnico, T.ordem_count, P.prioridade_order
FROM Tecnicos T
LEFT JOIN Prioridades P ON T.id_tecnico = P.id_tecnico
ORDER BY T.ordem_count ASC, P.prioridade_order ASC
LIMIT 10;
