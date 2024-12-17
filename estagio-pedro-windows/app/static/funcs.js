document.addEventListener("DOMContentLoaded", function() {
const table = document.getElementById('clientes_telnet');
    table.addEventListener('click', function(event){
        const elements = event.target.closest('tr');
        if(elements){
            const cell = elements.getElementsByTagName('td');
            const dt_cell = cell[1].innerText;
            alert(`Nome da pessoa: ${dt_cell}`);
        }
    });
});
// setInterval(function() {
//     location.reload();
// }, 10000);
