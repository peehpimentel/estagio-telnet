from django.shortcuts import render
from .services import *

def filial_view(request):
    # Chama a função para pegar a contagem
    contagem = count_filial()
    modal_table = modal_ser()
    context = {
      'rows': modal_table,
      'contagem': contagem,
    }
    # Passa o valor da contagem para o template
    return render(request, 'filial.html', context)


