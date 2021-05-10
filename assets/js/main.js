$(document).ready(function(){
    loadTheme();
    loadHeroes();

    $('#add-hero').off('click').on('click', function(){
        let newHero = createHero();
        $('#heroes-container').append(newHero);
        bindHeroBtns();
    });    
});

function bindHeroBtns()
{
    $('.hero-url').off('keyup').on('keyup', function(){
        if(validURL($(this).val()))
        {
            $.ajax({
                url: $(this).val(),
                type: 'GET',
                dataType: 'html',
                success:function(response){
                    console.log(response);
                }
            });

            // Store value in localStorage
            saveHero($(this).val(), $(this).attr('data-heropos'));
        }
    });

    $('.del-hero').off('click').on('click', function(){
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce héro ?")) {
            deleteHero($(this).attr('data-del'));
            loadHeroes();
        }
    });
}

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}

function deleteHero(heroPos)
{
    var heroes = []; 

    if(typeof localStorage.getItem('heroes') != 'undefined' && localStorage.getItem('heroes') != null && localStorage.getItem('heroes') != 'null')
    {
        heroes = JSON.parse(localStorage.getItem('heroes'));
    }

    heroes.splice(heroPos, 1);

    localStorage.setItem('heroes', JSON.stringify(heroes));
}

function createHero(url)
{
    let heroUrl = ''; let heroImg = '';
    if(typeof url != 'undefined')
    {
        heroUrl = url;
    }

    let heroPos = $('.hero-img').length;

    let newHero = '<div class="row mb-2 align-items-center">';
    newHero += '<div class="col-3 text-center hero-img"><img src="assets/img/helmet.png" /></div>';
    newHero += '<div class="col-7"><input type="text" class="w-100 hero-url" data-heropos="'+heroPos+'" ';
    newHero += ' placeholder="URL de la fiche personnage aidedd.org" value="'+heroUrl+'" /></div>';
    newHero += '<div class="col-2"><button class="btn btn-danger p-2 del-hero" data-del="'+heroPos+'"><i class="fas fa-trash"></i></button></div>';
    newHero += '</div>';

    return newHero;
}

function loadHeroes()
{
    $('#heroes-container').html('');

    var heroes = []; 

    if(typeof localStorage.getItem('heroes') != 'undefined' && localStorage.getItem('heroes') != null && localStorage.getItem('heroes') != 'null')
    {
        heroes = JSON.parse(localStorage.getItem('heroes'));
    }
    
    for(let i=0; i < heroes.length; i++)
    {
        let newHero = createHero(heroes[i]);
        $('#heroes-container').append(newHero);
    }

    $('#nb-heroes').html(heroes.length);

    bindHeroBtns();
}

function saveHero(url, heroPos)
{
    var heroes = [];
    
    if(typeof localStorage.getItem('heroes') != 'undefined' && localStorage.getItem('heroes') != null && localStorage.getItem('heroes') != 'null')
    {
        heroes = JSON.parse(localStorage.getItem('heroes'));
    }
    
    heroes[heroPos] = url;
    
    localStorage.setItem('heroes', JSON.stringify(heroes));
}

function loadTheme()
{
    if(localStorage.getItem('theme') == 'dark-theme') {
        $('body').addClass('dark-theme').removeClass('light-theme');
        $('#dark-theme-switch').css('display', 'none');
        $('#light-theme-switch').css('display', 'inline-block');
    } else {
        $('body').addClass('light-theme').removeClass('dark-theme');
        $('#dark-theme-switch').css('display', 'inline-block');
        $('#light-theme-switch').css('display', 'none');
    }
}

function switchTheme(theme)
{
    if(theme == 'dark-theme') { 
        $('#dark-theme-switch').css('display', 'none');
        $('#light-theme-switch').css('display', 'inline-block');
    } else {
        $('#dark-theme-switch').css('display', 'inline-block');
        $('#light-theme-switch').css('display', 'none');
    }

    localStorage.setItem('theme', theme);
    loadTheme();
}