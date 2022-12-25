class Productos {
    constructor() {
        this.productos = [];
    }
    
    #error = { error : 'producto no encontrado' };

    crear(objeto) {
        let id = 1;
        if (this.productos.length !== 0){
            this.productos.sort((a,b) => a.id - b.id)
            id = this.productos[this.productos.length-1].id + 1;
        }
        objeto.price = parseInt(objeto.price);
        this.productos.push({id, ...objeto});
        return {id, ...objeto};
    }

    getAll(){
        return this.productos;
    }

    getById(id){
        const objeto = this.productos.find((e)=> e.id === id);
        if(objeto) return objeto
        return this.#error
    }

    updateById(id,objeto){
        let actualizado = false;
        this.productos = this.productos.map((e)=> {
            if(e.id === id) {
                console.log(e,objeto)
                e.title = objeto.title;
                e.price = parseInt(objeto.price);
                e.thumbnail = objeto.thumbnail;
                actualizado = true
            }
            return e;
        });
        if (actualizado === false) this.#error;
    }

    deleteById(id){
        this.productos = this.productos.reduce((acc,e)=> {
            if (e.id !== id) acc.push(e)
            return acc;
        }, []);
    }    

}

module.exports = Productos;