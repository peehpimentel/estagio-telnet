from django.db import connections
from django.shortcuts import render
from django.http import HttpResponse


def lista_contratos(request):

    search_query = ""
    resultados = []
    id_filial = []
    
    id_filial = request.POST.getlist('filial')
    search_query = request.POST.get('search', '')
    if id_filial:
        print(id_filial, search_query)
    else:
        id_filial = [1, 11, 15]
        print(id_filial, search_query)

    with connections['mysql_db'].cursor() as cursor:
        cursor.execute("""
            SELECT c.`id` AS 'ID Cliente', c.razao AS 'Nome Cliente', cont.`id` AS 'ID Contrato', cont.contrato AS 'Contrato',
            assu.assunto AS 'O.S Assunto', oss.`id` AS 'ID O.S', oss.data_abertura AS 'Data Abertura O.S', oss.`ultima_atualizacao` AS 'Última ATT O.S', 
            oss.`status` AS 'Status O.S', 
            cid.id AS 'ID Cidade', cid.nome AS 'Cidade' 
            FROM cliente c 
            INNER JOIN cliente_contrato cont ON cont.`id_cliente`=c.`id` 
            INNER JOIN cidade cid ON cid.`id`=c.`cidade` 
            INNER JOIN su_oss_chamado oss ON oss.`id_cliente`=c.`id` 
            INNER JOIN su_oss_assunto assu ON oss.id_assunto=assu.id 
            WHERE cont.id_filial IN %s AND (oss.`ultima_atualizacao` IS NOT NULL AND oss.`ultima_atualizacao` >= CURDATE() AND 
            oss.`ultima_atualizacao` <> '0000-00-00 00:00:00' AND oss.status <> 'F') AND c.razao LIKE %s
            GROUP BY oss.`id` 
            ORDER BY oss.`ultima_atualizacao` DESC 
            LIMIT 10
        """, [tuple(id_filial), f'%{search_query}%'])
        resultados = cursor.fetchall()
    print('antes', id_filial)
    context = {
        'resultados': resultados,
        'id_filial': id_filial,
        'search_query': search_query,
    }

    return render(request, 'mysql.html', context)

def count_filial():
    with connections['mysql_db'].cursor() as cursor:
        cursor.execute(
            "SELECT COUNT(cc.id) AS contagem "
            "FROM cliente_contrato cc "
            "WHERE cc.id_filial = '21'" 
        )
        content = cursor.fetchall()
        if content:
            return content[0][0]
    connections.close_all()
    return 0

def modal_ser():
    with connections['mysql_db'].cursor() as cursor:
        cursor.execute( """
            SELECT CONCAT('<td>',c.`id`,'</td><td>',c.razao,'</td><td>',cc.`id`,'</td><td>', cc.contrato,'</td><td>', 
            tc.`tipo_cliente`,'</td>') AS retorno FROM cliente c 
            INNER JOIN cliente_contrato cc ON cc.`id_cliente` = c.id 
            INNER JOIN tipo_cliente tc ON tc.`id`=c.`id_tipo_cliente` 
            GROUP BY c.`id` LIMIT 10
        """
        )
        rows = cursor.fetchall()
        modal_table = ""
        for row in rows:
            modal_table += "<tr>"
            for cell in row:
                modal_table += str(cell)
            modal_table += ""
    connections.close_all()
    return modal_table
