from django.db import connections
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

def processar_dados(data):
    data_format = data.replace("[", "").replace("]", "")
    dt_where = "cont.id_filial in ("+data_format+")"
    return dt_where

@csrf_exempt
def get_view_dt(request):
    if request.method == 'GET':
        data = request.GET.get('data', '')
        query_att = processar_dados(data)
        return JsonResponse({"retorno": query_att})
    return JsonResponse({'erro': 'Não permitido.'}, status=405)

def get_data_from_mysql():
    with connections['mysql_db'].cursor() as cursor:
        func_proc_dt = processar_dados()
        query_att = func_proc_dt[1]
        print(query_att)
        cursor.execute(
            "SELECT CONCAT('<td>',c.`id`,'</td><td>',c.razao,'</td><td>',cont.`id`,'</td><td>', cont.contrato,'</td><td>',"
            " assu.assunto,'</td><td>', oss.`id`,'</td><td>',oss.data_abertura,'</td><td>',oss.`ultima_atualizacao`,'</td><td>', oss.`status`,'</td><td>', "
            "cid.id,'</td><td>',cid.nome,'</td></tr>') "
            "AS retorno FROM cliente c " 
	        "INNER JOIN cliente_contrato cont ON cont.`id_cliente`=c.`id` "
	        "INNER JOIN cidade cid ON cid.`id`=c.`cidade` "
	        "INNER JOIN su_oss_chamado oss ON oss.`id_cliente`=c.`id` "
            "INNER JOIN su_oss_assunto assu ON oss.id_assunto=assu.id "
            "WHERE (oss.`ultima_atualizacao` IS NOT NULL AND oss.`ultima_atualizacao` >= CURDATE() AND "
            "oss.`ultima_atualizacao` <> '0000-00-00 00:00:00' and oss.status <> 'F') "
            "GROUP BY oss.`id` "
            "ORDER BY oss.`ultima_atualizacao` DESC "
            "LIMIT 5"
        )
        rows = cursor.fetchall()
        tTable = ""
        for row in rows:
            tTable += "<tr>"
            for cell in row:
                tTable += str(cell)
            tTable += ""
    return tTable





























from django.db import connections
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

# def processar_dados(data):
#     data_format = data.replace("[", "").replace("]", "")
#     # dt_where = "cont.id_filial in ("+data_format+")"
#     dt_where = "cont.id_filial in (1,11,20)"
#     return dt_where

@csrf_exempt
def get_view_dt(request):
    if request.method == 'GET':
        data = request.GET.get('data', '')
        # data_format = data.replace("[", "").replace("]", "")
        dt_where = "cont.id_filial in ("+data.replace("[", "").replace("]", "")+")"
        # query_att = processar_dados(data)
        dt_table = get_data_from_mysql(dt_where)
        return JsonResponse({"retorno": dt_table})
    return JsonResponse({'erro': 'Não permitido.'}, status=405)

def get_data_from_mysql(dt_where):
    dt_where_dt = dt_where
    with connections['mysql_db'].cursor() as cursor:
        cursor.execute(
            "SELECT CONCAT('<td>',c.id,'</td><td>',c.razao,'</td><td>',cont.id,'</td><td>', cont.contrato,'</td><td>',"
            " assu.assunto,'</td><td>', oss.id,'</td><td>',oss.data_abertura,'</td><td>',oss.ultima_atualizacao,'</td><td>', oss.status,'</td><td>', "
            "cid.id,'</td><td>',cid.nome,'</td></tr>') "
            "AS retorno FROM cliente c " 
	        "INNER JOIN cliente_contrato cont ON cont.id_cliente=c.id "
	        "INNER JOIN cidade cid ON cid.id=c.cidade "
	        "INNER JOIN su_oss_chamado oss ON oss.id_cliente=c.id "
            "INNER JOIN su_oss_assunto assu ON oss.id_assunto=assu.id "
            "WHERE "+dt_where_dt+" AND (oss.ultima_atualizacao IS NOT NULL AND oss.ultima_atualizacao >= CURDATE() AND "
            "oss.ultima_atualizacao <> '0000-00-00 00:00:00' and oss.status <> 'F') "
            "GROUP BY oss.id "
            "ORDER BY oss.ultima_atualizacao DESC "
            "LIMIT 5"
        )
        rows = cursor.fetchall()
        tTable = ""
        for row in rows:
            tTable += "<tr>"
            for cell in row:
                tTable += str(cell)
            tTable += ""
    return tTable























from django.shortcuts import render
from .services import get_view_dt

def estagio_view(request):
    tTable = get_view_dt(request)
    context = {
        'rows': tTable
    }
    return render(request, 'mysql.html', context)




















from django.db import connections
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def get_view_dt(request):
    if request.method == 'GET':
        data = request.GET.get('data', '')
        if not data.strip():
            return ("cont.id_filial in (1)")
        else:
             data_format = data.replace("[", "").replace("]", "")
             dt_view = "cont.id_filial in ("+data_format+")"
             print(dt_view)
        return (dt_view)     
    return ("cont.id_filial in (1)")

def get_data_from_mysql(dt_view):
    with connections['mysql_db'].cursor() as cursor:
        cursor.execute(
            "SELECT CONCAT('<td>',c.`id`,'</td><td>',c.razao,'</td><td>',cont.`id`,'</td><td>', cont.contrato,'</td><td>',"
            " assu.assunto,'</td><td>', oss.`id`,'</td><td>',oss.data_abertura,'</td><td>',oss.`ultima_atualizacao`,'</td><td>', oss.`status`,'</td><td>', "
            "cid.id,'</td><td>',cid.nome,'</td></tr>') "
            "AS retorno FROM cliente c " 
	        "INNER JOIN cliente_contrato cont ON cont.`id_cliente`=c.`id` "
	        "INNER JOIN cidade cid ON cid.`id`=c.`cidade` "
	        "INNER JOIN su_oss_chamado oss ON oss.`id_cliente`=c.`id` "
            "INNER JOIN su_oss_assunto assu ON oss.id_assunto=assu.id "
            "WHERE %s AND (oss.`ultima_atualizacao` IS NOT NULL AND oss.`ultima_atualizacao` >= CURDATE() AND "
            "oss.`ultima_atualizacao` <> '0000-00-00 00:00:00' and oss.status <> 'F') "
            "GROUP BY oss.`id` "
            "ORDER BY oss.`ultima_atualizacao` DESC "
            "LIMIT 5", (dt_view), multi=True
        )

        
        rows = cursor.fetchall()
        tTable = ""
        for row in rows:
            tTable += "<tr>"
            for cell in row:
                tTable += str(cell)
            tTable += ""
        connections.close_all()
    return tTable

-----------------------------------------------------------------------------------------------------------------------------------------------


from django.db import connections
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def get_view_dt(request):
    if request.method == 'GET':
        data = request.GET.get('data', '')
        if not data.strip():
            comando = "cont.id_filial in (1)"
        else:
             data_format = data.replace("[", "").replace("]", "")
             comando = f"cont.id_filial in ({data_format})"
             print(comando) 
    comando = "cont.id_filial in (1)"
    try:
        with connections['mysql_db'].cursor() as cursor:
            cursor.execute(
                "SELECT CONCAT('<td>',c.`id`,'</td><td>',c.razao,'</td><td>',cont.`id`,'</td><td>', cont.contrato,'</td><td>',"
                " assu.assunto,'</td><td>', oss.`id`,'</td><td>',oss.data_abertura,'</td><td>',oss.`ultima_atualizacao`,'</td><td>', oss.`status`,'</td><td>', "
                "cid.id,'</td><td>',cid.nome,'</td></tr>') "
                "AS retorno FROM cliente c " 
                "INNER JOIN cliente_contrato cont ON cont.`id_cliente`=c.`id` "
                "INNER JOIN cidade cid ON cid.`id`=c.`cidade` "
                "INNER JOIN su_oss_chamado oss ON oss.`id_cliente`=c.`id` "
                "INNER JOIN su_oss_assunto assu ON oss.id_assunto=assu.id "
                "WHERE "+comando+" AND (oss.`ultima_atualizacao` IS NOT NULL AND oss.`ultima_atualizacao` >= CURDATE() AND "
                "oss.`ultima_atualizacao` <> '0000-00-00 00:00:00' and oss.status <> 'F') "
                "GROUP BY oss.`id` "
                "ORDER BY oss.`ultima_atualizacao` DESC "
                "LIMIT 5"
            )
        rows = cursor.fetchall()
        tTable = ""
        for row in rows:
            tTable += "<tr>"
            for cell in row:
                tTable += str(cell)
            tTable += ""
    except Exception as e:
        print("erro: {e}" )
    return False

    -------------------------------------------------------------------------------------------------------------------------------------------

    from django.http import JsonResponse
    from django.views.decorators.csrf import csrf_exempt
    import mysql.connector
    from decouple import config

@csrf_exempt
def get_view_dt(request):
    if request.method == 'GET':
        data = request.GET.get('data', '')
        if not data.strip():
            comando = "cont.id_filial in (1)"
        else:
             data_format = data.replace("[", "").replace("]", "")
             comando = f"cont.id_filial in ({data_format})"
             print(comando) 
    comando = "cont.id_filial in (1)"

    connection = mysql.connector.connect(
        host=config('DB_HOST'),
        user=config('DB_USER'),
        password=config('DB_PASSWORD'),
        database=config('DB_NAME')
    )

    cursor = connection.cursor()
    sql = """
        SELECT CONCAT('<td>',c.`id`,'</td><td>',c.razao,'</td><td>',cont.`id`,'</td><td>', cont.contrato,'</td><td>', 
        assu.assunto,'</td><td>', oss.`id`,'</td><td>', oss.data_abertura,'</td><td>', oss.`ultima_atualizacao`,'</td><td>', 
        oss.`status`,'</td><td>', cid.id,'</td><td>',cid.nome,'</td></tr>') AS retorno FROM cliente c 
        INNER JOIN cliente_contrato cont ON cont.`id_cliente`=c.`id` 
        INNER JOIN cidade cid ON cid.`id`=c.`cidade` 
        INNER JOIN su_oss_chamado oss ON oss.`id_cliente`=c.`id` 
        INNER JOIN su_oss_assunto assu ON oss.id_assunto=assu.id 
        WHERE (oss.`ultima_atualizacao` IS NOT NULL AND oss.`ultima_atualizacao` >= CURDATE() 
        AND oss.`ultima_atualizacao` <> '0000-00-00 00:00:00' and oss.status <> 'F') 
        GROUP BY oss.`id` 
        ORDER BY oss.`ultima_atualizacao` 
        DESC LIMIT 5"
    """
    cursor.execute(sql, multi=True)
    rows = cursor.fetchall()
    tTable = ""
    for row in rows:
        tTable += "<tr>"
        for cell in row:
            tTable += str(cell)
        tTable += ""
    cursor.close()
    connection.close()
    return tTable








































    22/10/24

from django.db import connections
from django.shortcuts import render
from django.http import HttpResponse

def lista_contratos(request):

    search_query = ""
    resultados = []
    id_filial = []

    if request.method == 'POST':
        id_filial = request.POST.getlist('filial')
        search_query = request.POST.get('search', '')

    if id_filial:
        try:
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

            if resultados is None:
                resultados = []
        except Exception as e:
            print(f"Ocorreu um erro no banco de dados: {e}")
            return HttpResponse("Ocorreu um erro no banco de dados.")
        
    context = {
        'resultados': resultados,
        'id_filial': id_filial,
        'search_query': search_query,
    }
    return render(request, 'mysql.html', context)










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