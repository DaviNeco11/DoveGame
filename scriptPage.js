var emails = [];
//------------------------------Pega somente o email--------------------------------------------------------------
ZOHO.CREATOR.init()
    .then(function(data) {
        var config = { 
            appName : "DoveGame",
            reportName : "FirstForm_Report" 
        }
        ZOHO.CREATOR.API.getAllRecords(config).then(function(response){
            var recordArr = response.data;
            


            for (var index in recordArr) {

                var email = recordArr[index].RecebeEmail;
                var displayElement = document.getElementById("display");
                displayElement.textContent = email;
                emails.push(email);
            }
        });  
    });
    //-----------------------------Apaga o forms---------------------------------------------------
ZOHO.CREATOR.init()
    .then(function(data) {
        var config2 = { 
            appName : "DoveGame",
            reportName : "FirstForm_Report",
            criteria : "(RecebeEmail != \"Invalid\")"
        } 

                    ZOHO.CREATOR.API.deleteRecord(config2).then(function(response){
                    teste();

                    
                    });
                })

    //-------------------Funcao para o session -------------------------------
     function teste(){

        sessionStorage.setItem('usuario',emails[0])
        return 1;

    }
 //----------------------------------------------------------------------------------------------------------  

document.addEventListener('DOMContentLoaded', function() {
document.getElementById('startButton').addEventListener('click', function() {
window.location.href = 'index.html'; 
    });
});

//--------------Pega o quadro partitipante-------------------------------
var nomes = [];
var emails = [];
var IdAvatarArr = [];
var PontuacaoArr= [];

ZOHO.CREATOR.init()
    .then(function(data) {
        
        var config = { 
            appName : "DoveGame",
            reportName : "QuadroParticipante_Report" 
        }
        console.log(nomes," Texto do casca de bala")
        ZOHO.CREATOR.API.getAllRecords(config).then(function(response){
            var recordArr = response.data;
            
            console.log(recordArr);

            for (var index in recordArr) {

                // SEPARACAO

                var Nome = recordArr[index].Nome_Parti;
                var email = recordArr[index].Email_Parti;
                var idavatar = recordArr[index].Avatar;
                var pontuacao = recordArr[index].Pontuacao;

                //JOGA NA LISTA

                nomes.push(Nome);
                emails.push(email);
                IdAvatarArr.push(idavatar);
                PontuacaoArr.push(pontuacao);
            
                console.log(nomes, "Array aqui!!!!!!!!!");

                //Guarda o usuario da pagina em um objeto separado para manipulacao
                if(usuario == email){

                    protag.nomeOB= Nome;
                    protag.emailOB = email;
                    protag.IDOB = idavatar;
                    console.log(protag);
                }
            }

        });   
    });
    //--------------Menu de selecao-------------------------------
    function handleOptionClick(optionId) {
        sessionStorage.setItem('selectedOptionId', optionId);
        alert("Você selecionou a opção com ID: " + optionId);
    
        // Redireciona para nova_pagina.html
        window.location.href = "usupag.html";
    }

    //--------------USU SCPRIT-------------------------------
    const selectedOptionId = sessionStorage.getItem('selectedOptionId');
        document.getElementById('selected-option').textContent = 'Você selecionou a opção com ID: ' + selectedOptionId;


        
const usuario = sessionStorage.getItem('usuario');
console.log(usuario, "SESSION AQUI");

//Objeto do usuario

const protag= new Object();

