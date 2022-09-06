function getProductDiv(product,count) {
    var div = document.createElement("div");
    div.classList.add("product-div");
    let innerContent = `<div class="product-title">
            <h3>Product ID: ${product.id}</h3>
            <img src="./public/closeicon.svg" alt="X" class="close-icon" id="close-${count}">
        </div>

        <div class="product-body">
            <p>Product Price : ${product.price}</p>
            <p>Product Stock : ${product.stock}</p>
        </div>`;
        div.innerHTML = innerContent;
        return div;

}
$(function() {
    var x = 0;
    var width = $('.container').width()+45;
    var products = [
        {id:1,price:1000,stock:10},
        {id:2,price:2000,stock:20},
        {id:3,price:3000,stock:40},
        {id:4,price:4000,stock:10}
    
    ]

    for(product in products)
        $('#products').append(getProductDiv(products[product],product))
    
    var scrollPosition = 0;

    function autoSlide() {
        $(".circle").removeClass('active')
        scrollPosition  = (scrollPosition == 2)? 0 : scrollPosition+1;
        $($(".circle").get(scrollPosition)).addClass('active')
        $("#slider").scrollLeft(scrollPosition*width);

    }

    setInterval(autoSlide,5000);


    $("#right").click(function() {
        x = x+1100
        $("#slider").scrollLeft(x);
    })
    $("#left").click(function() {
        x = x -1100
        $("#slider").scrollLeft(x);
    })
    $('#form').submit(function(e) {
        
        e.preventDefault();
        let product = {
            id:$('#p-id').val(),
            price:$('#price').val(),
            stock:$("#stock").val()
        }
        products.push(product)
        let count = products.length-1;
        $('#products').append(getProductDiv(product,count))
        $("form").trigger("reset");
    })

    $(document).on('click','.close-icon',function() {
        let index = parseInt($(this).attr("id").split("-")[1]);
        // console.log("Deleting Element")
        products.splice(index,1);
        // console.log(products)

        $("#products").html("");
        for(product in products)
            $('#products').append(getProductDiv(products[product],product))
    })

    $('.circle').click(function() {
        let index = $('.circle').index(this)
        console.log(index)
        $("#slider").scrollLeft(index*width);
        $('.circle').removeClass('active')
        $(this).addClass('active');
        
    })
})