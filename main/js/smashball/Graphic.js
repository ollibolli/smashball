define(['utils/_','smashball/Base'],function(_, Base){

    Graphic.Extend(Base);

    function Graphic(){
        this.Super();
    };
    /**
     * Clear the venues graphic to prepare new render phase.
     */
    Graphic.prototype.clear = function() {
        throw 'Not implemented';
    }
    /**
     * Creates a graphical object deffining the render strategis
     * @param string
     * @param element
     * @param width
     * @param height
     * @param depth
     */
    Graphic.factory = function(string,element,width,height,depth){
        _.assert(Graphic.factory[string]);
        var graphic = Graphic.factory[string](element,width,height,depth);
        graphic.graphicType = string;
        return graphic;
    };

    /**
     * A graphic factory method for creating a Graphic object suporting the <canvas> element
     * @param element a element where the canvas will be render in
     * @param width The with of the canvas
     * @param height The height of the canvas
     */
    Graphic.factory.canvas2d = function canvas2d(element,width,height){
        var graphic = new Graphic();
        graphic.canvas = document.createElement("canvas");
        graphic.context = graphic.canvas.getContext("2d");
        graphic.canvas.width =  graphic.width = width;
        graphic.canvas.height = graphic.height = height;
        graphic.clear = function() {
            graphic.context.clearRect(0, 0, graphic.width, graphic.height);
        }
        element.appendChild(graphic.canvas);
        return graphic;
    }

    return Graphic;
});