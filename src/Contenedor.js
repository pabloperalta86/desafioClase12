fs = require('fs');

class Contenedor{
    #path
    constructor(fileName){
        this.fileName = fileName;
        this.#path = `./data/${this.fileName}`;
    }

    async #existsFile(){
        try{
            if (await fs.promises.access(this.#path,fs.constants.R_OK | fs.constants.W_OK)
                .then(() => true)
                .catch(() => false) !== false) {
                    return true;
            }else{
                return false;
            }
        } catch(error){
            return false;
        }
    }

    async save(object){
        try{
            if (await this.#existsFile()) {
                const data = JSON.parse(await fs.promises.readFile(this.#path, "utf-8"));
                const ultimoId = data[data.length - 1].id;
                object.id = ultimoId + 1 
                data.push(object);
                await fs.promises.writeFile(this.#path, JSON.stringify(data,null,2));
            } else {
                object.id = 1;
                await fs.promises.writeFile(this.#path, JSON.stringify([object],null,2));
            }
            return object.id;
        } catch(error){
            console.log(`No se pudo guardar el archivo, se genero este error: ${error}`)
            return 0;
        }
    }

    async getById(id){
        try{
            if (await this.#existsFile()) {
                const data = JSON.parse(await fs.promises.readFile(this.#path, "utf-8"));
                return data.find((e,i) => e.id === id);
            } else {
                return null;
            }
        } catch(error){
            console.log(`No se pudo consultar el id, se genero este error: ${error}`)
            return null;
        }
    }

    async getAll(){
        try{
            if (await this.#existsFile()) {
                return JSON.parse(await fs.promises.readFile(this.#path, "utf-8"));
            } else {
                return null;
            }        
        } catch(error){
            console.log(`No se pudo consultar todos los elementos, se genero este error: ${error}`)
            return null;
        }
    }

    async getRandom(){
        try{
            if (await this.#existsFile()) {
                const data = JSON.parse(await fs.promises.readFile(this.#path, "utf-8"));
                let id = Math.ceil(Math.random() * data.length)
                return data.find((e,i) => e.id === id);
            } else {
                return null;
            }
        } catch(error){
            console.log(`No se pudo consultar el id, se genero este error: ${error}`)
            return null;
        }
    }

    async deleteById(id){
        try{
            if (await this.#existsFile()) {
                const data = JSON.parse(await fs.promises.readFile(this.#path, "utf-8"));
                const resultado = data.filter((e,i) => e.id !== id);
                await fs.promises.writeFile(this.#path, JSON.stringify(resultado,null,2));
            }        
        } catch(error){
            console.log(`No se pudo borrar el id ${id}, se genero este error: ${error}`)
        }
    }

    async deleteAll(){
        try{
            await fs.promises.unlink(this.#path);
        } catch(error){
            console.log(`No se pudo borrar todo el archivo, se genero este error: ${error}`)
        }
    }

}

module.exports = Contenedor;