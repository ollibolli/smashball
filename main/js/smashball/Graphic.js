define(['smashball/Base'],function(Base){

    Graphic.Extend(Base);

    function Graphic(){
        this.Super();
    };

    /**
     * Creates a graphical object deffining the render strategis
     * @param string
     * @param element
     * @param width
     * @param height
     * @param depth
     */
    Graphic.factory = function(string,element,width,height,depth){
        this.assert(Graphic.factory[string]);
        var graphic = Graphic.factory[string](element,width,height,depth);
        graphic.graphicType = string;
        return graphic;
    };

    Graphic.factory.canvas2d = function canvas2d(element,width,height){
        var graphic = new Graphic();
        graphic.canvas = document.createElement("canvas");
        graphic.context = graphic.canvas.getContext("2d");
        graphic.canvas.width =  graphic.width = width;
        graphic.canvas.height = graphic.height = height;
        element.appendChild(graphic.canvas);
        return graphic;
    }

    return Graphic;
});