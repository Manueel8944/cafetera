const prompt = require ("prompt-sync")();
const fs = require('fs');

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

        let bien = false
        let nombre

        while(!bien){
            nombre = prompt("Nombre de la bebida: ").toLowerCase()
            let encontrado = false
            for(let i=0;i<this.maquinacafe[2].length;i++){
                if (this.maquinacafe[2][i]["bebida"]["nombre"] == nombre || nombre == ""){
                    encontrado = true
                }
            }

            if (encontrado == true){
                console.log("Error: Nombre invalido")
            }
            else{
                bien = true
            }
        }

        let agua = parseInt(prompt("Cantidad de agua (max 1000): "))
        while (agua > 1000 || isNaN(agua)) {
            console.log("Error: valor introducido invalido")
            agua = parseInt(prompt("Cantidad de agua (max 1000): "))
        }
        let leche = parseInt(prompt("Cantidad de leche (max 500): "))
        while (leche > 500 || isNaN(leche)) {
            console.log("Error: valor introducido invalido")
            leche = parseInt(prompt("Cantidad de leche (max 500): "))
        }
        let cafe = parseInt(prompt("Cantidad de cafe (max 300): "))
        while (cafe > 300 || isNaN(cafe)) {
            console.log("Error: valor introducido invalido")
            cafe = parseInt(prompt("Cantidad de cafe (max 300): "))
        }
        let azucar = parseInt(prompt("Cantidad de azucar (max 200): "))
        while (azucar > 200 || isNaN(azucar)) {
            console.log("Error: valor introducido invalido")
            azucar = parseInt(prompt("Cantidad de azucar (max 200): "))
        }

        let nuevabebida = {
            bebida: {nombre: nombre, "agua": agua, "leche": leche, "cafe": cafe, "azucar": azucar} 
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

    bebidasdisponibles(){
        this.leerdatos();
        for(let i=0;i<this.maquinacafe[2].length;i++){
            if (this.maquinacafe[2][i]["bebida"]["agua"] <= this.maquinacafe[1]["agua"] && this.maquinacafe[2][i]["bebida"]["leche"] <= this.maquinacafe[1]["leche"] && this.maquinacafe[2][i]["bebida"]["cafe"] <= this.maquinacafe[1]["cafe"] && this.maquinacafe[2][i]["bebida"]["azucar"] <= this.maquinacafe[1]["azucar"]){
                console.log(i,"-",this.maquinacafe[2][i]["bebida"]["nombre"])
            }
        }
    }

    pedirbebida(){
        this.leerdatos();
        for(let i=0;i<this.maquinacafe[2].length;i++){
                console.log(i,"-",this.maquinacafe[2][i]["bebida"]["nombre"])
        }
        let bebida = parseInt(prompt("Elije una bebida de las que ves por pantalla (numero): "))
        if (isNaN(bebida) || bebida > this.maquinacafe[2].length - 1 || bebida < 0) {
            console.log("Numero fuera de rango")
        }
        else if (this.maquinacafe[2][bebida]["bebida"]["agua"] > this.maquinacafe[1]["agua"] || this.maquinacafe[2][bebida]["bebida"]["leche"] > this.maquinacafe[1]["leche"] || this.maquinacafe[2][bebida]["bebida"]["cafe"] > this.maquinacafe[1]["cafe"] || this.maquinacafe[2][bebida]["bebida"]["azucar"] > this.maquinacafe[1]["azucar"]){
            console.log("Error: bebida no disponible, elija una de las indicadas")
        }

        else{
            this.maquinacafe[1]["agua"] -= this.maquinacafe[2][bebida]["bebida"]["agua"]
            this.maquinacafe[1]["leche"] -= this.maquinacafe[2][bebida]["bebida"]["leche"]
            this.maquinacafe[1]["cafe"] -= this.maquinacafe[2][bebida]["bebida"]["cafe"]
            this.maquinacafe[1]["azucar"] -= this.maquinacafe[2][bebida]["bebida"]["azucar"]
            pause = prompt(("Sirviendo Bebida ("+this.maquinacafe[2][bebida]["bebida"]["nombre"]+")..."))
            pause = prompt(("Sirviendo Bebida ("+this.maquinacafe[2][bebida]["bebida"]["nombre"]+")......"))
            pause = prompt(("Sirviendo Bebida ("+this.maquinacafe[2][bebida]["bebida"]["nombre"]+")........."))
            console.log("Bebida servida correctamente!!")

        }

        this.escribirdatos()
    }
}

function menu () {
    
    const maquina = new Cafetera()
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
                maquina.bebidasdisponibles()
                pause = prompt("Pulse Enter para continuar...")
                break;
            }
            
            case 2: {
                console.clear()
                console.log("=== Nueva bebida ===") 
                .crearbebida()
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
                break;maquina
            }

            case 5: {
                console.clear()
                console.log("=== Pedir bebida ===") 
                maquina.pedirbebida()
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

module.exports = {menu, Cafetera};