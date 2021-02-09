$('#getProducts').click(()=>{
    $.ajax({
        url: '/products',
        success: (products)=>{
            renderProducts(products);
        }
    });
});
$('#productForm').submit((event)=>{
    event.preventDefault();
    let newProductName = $('#newProduct').val();
    if(!newProductName) return alert('Agregue el nombre del producto');
    $.ajax({
        url: '/products',
        method: 'POST',
        data: {
            name: newProductName
        },
        success: (products)=>{
            renderProducts(products);
            $('#newProduct').val('');
        } 
    });
});
$('table').on('click', '.update-button', function(event){
    let row = $(this).closest('tr'); 
    let id = row.attr('id');
    let name = row.find('.name').val();
    $.ajax({
        url: `products/${id}`,
        method: 'PUT',
        data: {
            name
        },
        success: (products)=>{
            renderProducts(products);
        }
    });
});
$('table').on('click', '.delete-button', function(event){
    let id = $(this).closest('tr').attr('id');
    $.ajax({
        url: `products/${id}`,
        method: 'DELETE',
        success: (products)=>{
            renderProducts(products);
        }
    });
});
const renderProducts = products =>{
    let tableBody = $('tbody');
    tableBody.html('');
    return products.forEach((product, index)=>tableBody.append(`
            <tr id="${index + 1}">
                <td>${index + 1}</td>
                <td>
                    <input type="text" value=${product.name} class="name">
                </td>
                <td>
                    <button class="update-button">Actualizar</button>
                    <button class="delete-button">Eliminar</button>
                </td>
            </tr>
    `));
};