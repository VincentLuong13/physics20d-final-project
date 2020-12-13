$(document).ready(function() {
    init()

    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })
})

function init() {
    $('button.login100-form-btn').click( () => {
        let mass1 = $('input[name="mass1"]')
        let mass2 = $('input[name="mass2"]')
        let distance = $('input[name="distance"]')

        if (mass1.val() && mass2.val() && distance.val() ) {
            moveObjects(mass1, mass2, distance)
            calcForce(mass1, mass2, distance)
        }
    })
}

let moveObjects = (mass1, mass2, distance) => {
    let lEarth = $('.left-earth .earth')
    let rEarth = $('.right-earth .earth')
    let divider = $('.earth-divider')

    let m1 = parseFloat(mass1.val())
    let m2 = parseFloat(mass2.val())

    if (m1 === m2) {
        lEarth.width(200)
        lEarth.height(200)
        
        rEarth.width(200)
        rEarth.height(200)
    }
    else {
        if (m1 > m2) {
            lEarth.width(300)
            lEarth.height(300)

            let m = Math.max(10, 300 * m2 / m1)

            rEarth.width(m)
            rEarth.height(m)
        }
        else {
            rEarth.width(300)
            rEarth.height(300)

            let m = Math.max(10, 300 * m1 / m2)

            lEarth.width(m)
            lEarth.height(m)
        }
    }

    if (distance.val() > window.innerWidth * 10) {
        divider.width( (window.innerWidth - 1000) )
    }
    else {
        let ratio = distance.val() / (window.innerWidth * 10)
        divider.width( (window.innerWidth - 1000) * ratio)
    }


}

let calcForce = (mass1, mass2, distance) => {
    let G = 6.67430e-11
    let m1 = mass1.val()
    let m2 = mass2.val()
    let r = distance.val()

    let F = G * ( (m1 * m2) / (r * r))

    setTimeout( () => {
        $("#solution").html(F)
        $("#myModal").modal()
    }, 4000)
}