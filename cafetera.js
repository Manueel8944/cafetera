const prompt = require ("prompt-sync")();
const fs = require('fs');

let pause

class Cafetera {
    constructor () {
        this.maquinacafe = []
    }

    leerdatos(){
        const datos = fs.readFileSync("maquinacafe.json", 'utf8');
        this.maquinacafe = JSON.parse(datos);
    }

    escribirdatos(){
        const datosparseados = JSON.stringify(this.maquinacafe, null, 2);
        fs.writeFileSync("maquinacafe.json", datosparseados, 'utf8');
    }

    crearbebida(){
        this.leerdatos();
        let nombre = prompt("Nombre de la bebida: ")
        let agua = parseInt(prompt("Cantidad de agua (max 1000): "))
        let leche = parseInt(prompt("Cantidad de leche (max 500): "))
        let cafe = parseInt(prompt("Cantidad de cafe (max 300): "))
        let azucar = parseInt(prompt("Cantidad de azucar (max 200): "))

        if(agua > 1000){
            agua = 1000
        }
        if(leche > 500){
            leche = 500
        }
        if(cafe > 300){
            cafe = 300
        }
        if(azucar > 200){
            azucar = 200
        }   

        let nuevabebida = {
            nombre: {"agua": agua, "leche": leche, "cafe": cafe, "azucar": azucar} 
        }

        this.maquinacafe[2].push(nuevabebida)
        this.escribirdatos()
    }

    estadoingredientes(){
        this.leerdatos();
        console.log("- Agua:",this.maquinacafe[1]["agua"])
        console.log("- Leche:",this.maquinacafe[1]["leche"])
        console.log("- Cafe:",this.maquinacafe[1]["cafe"])
        console.log("- Azucar:",this.maquinacafe[1]["azucar"])
    }

    recargaringredientes(){
        this.leerdatos();
        this.maquinacafe[1] = this.maquinacafe[0];
        this.escribirdatos();
        console.log("Ingredientes recargados exitosamente")
    }

}

function menu () {

    let menu = 0

    while (menu != 6) { 

        console.clear()
        console.log("======== MÁQUINA DE CAFE ========")
        console.log("   1) Bebidas disponibles")
        console.log("   2) Nueva bebida")
        console.log("   3) Estado ingredientes") 
        console.log("   4) Recargar ingredientes") 
        console.log("   5) Pedir bebida")    
        console.log("   6) Salir")  
        console.log("=================================")

        menu = parseInt(prompt("Elige una opción: "))

        console.clear()

        switch (menu) {

            case 1: {
                console.clear()
                console.log("=== Bebidas disponibles ===") 
                pause = prompt("Pulse Enter para continuar...")
                break;
            }
            
            case 2: {
                console.clear()
                console.log("=== Nueva bebida ===") 
                maquina.crearbebida()
                pause = prompt("Pulse Enter para continuar...")
                break;
            }
        
            case 3: {
                console.clear()
                console.log("=== Estado ingredientes ===") 
                maquina.estadoingredientes()
                pause = prompt("Pulse Enter para continuar...")
                break;
            }

            case 4: {
                console.clear()
                console.log("=== Recargar ingredientes ===")
                maquina.recargaringredientes()
                pause = prompt("Pulse Enter para continuar...")
                break;
            }

            case 5: {
                console.clear()
                console.log("=== Pedir bebida ===") 
                pause = prompt("Pulse Enter para continuar...")
                break;
            }

            case 6: {
                console.clear()
                console.log("=== Salir ===")
                break;
            }

            default: {
                console.log("Error: Opción no válida, intentalo de nuevo.");
                pause = prompt("Pulse Enter para continuar...")
            }
        }
    }
}

const maquina = new Cafetera()
console.clear()
menu ()
