//----------------------------------------------------------------Bowling Pin's Revenge----------------------------------------------------------------//
//-----------------------------------------------------------------------pin.js---------------------------------------------------------------//


//Registering a component to randomly spawn pins
AFRAME.registerComponent("pin-spawner",{

    //Schema (1 element)
    schema:{
        showPins:{type:"boolean",default:false}
    },

    //Calling the update function
    update:function(){
         //Verifying whether the 'showPins' property is true or not
        ////Case-1 -The 'showPins' property is true
        if(this.data.showPins){

            //Creating a for loop to create 30 pins
            for(var i=0;i<45;i++){

                //Creating a new entity element and seeting its model to a bowling pin
                pin_el=document.createElement("a-entity")
                pin_el.setAttribute("gltf-model","./models/pin/scene.gltf")
                
                //Creating random x and z values
                x_random=Math.random()*25-Math.random()*25
                z_random=Math.random()*25-Math.random()*25
                
                //Sourcing the camera element
                camera_el=document.querySelector("#camera_player")

                //Setting the position, scale dynamic components and rotation
                pin_el.setAttribute("position",`${x_random} ${z_random} 0 `)
                pin_el.setAttribute("scale","1.5 1.5 1.5")
                pin_el.setAttribute("static-body",{shape:"sphere",sphereRadius:"0.2"})
                pin_el.setAttribute("animation",{property:"position",loop:"false",dur:30000,easing:"linear",to:`0 0 0`})
                pin_el.setAttribute("rotation","0 90 90")
                pin_el.setAttribute("id",`pin_e${i}`)

                //Sourcing the scene element and and appending the entity as a child to it
                scene_el=document.querySelector("#plane")
                scene_el.appendChild(pin_el)
        }
        }  
    },
})

//-----------------------------------------------------------------------pin.js---------------------------------------------------------------//
//----------------------------------------------------------------Bowling Pin's Revenge----------------------------------------------------------------//

