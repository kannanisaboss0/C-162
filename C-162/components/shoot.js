//----------------------------------------------------------------Bowling Pin's Revenge----------------------------------------------------------------//
//-----------------------------------------------------------------------shoot.js---------------------------------------------------------------//

//Registering a component to create the shot mechanism of the ball
AFRAME.registerComponent("ball-shooter",{

    //Schema
    schema:{},

    //Calling the init function
    init:function(){

        //Adding a global event listener to listen to a "keydown" event
        window.addEventListener("keydown",(e)=>{

            //Verifying whether the keycode of the key pressed is 32 or not
            ////Case-1 -The keycode is 32
            if(e.keyCode===32){
                //Sourcing the element responsible for keeping track of the numer of bowling balls left 
                text_ammo_el=document.querySelector("#ammo_text")

                //Sourcing the text element's text attribute, and the value property in it 
                text_ammo_value=text_ammo_el.getAttribute("text").value 

                //Coverting the attained string into an integer
                text_ammo_value=parseInt(text_ammo_value)-1

                //Verifying whether the number of bowling balls left is greater than zero
                ////Case-1 -The number of bowling balls are less than or equal to 0
                if(text_ammo_value<=0){

                    //Setting the number of bowling balls left ot zero, just ot be on the safe side
                    text_ammo_value=0

                    //Creating an element that informs the player that the bowling balls have been depleted
                    empty_text_el=document.createElement("a-entity")

                    //setting the text, position and id attributes of the text element
                    empty_text_el.setAttribute("text",{value:"OUT OF AMMO",font:"exo2bold",align:"center",width:5,color:"orange"})
                    empty_text_el.setAttribute("position","0 0.5 -2")
                    empty_text_el.setAttribute("id","empty_text")

                    //Sourcing the camera element and appending the empty prompt txt to it as a child
                    camera_el=document.querySelector("#camera_player")
                    camera_el.appendChild(empty_text_el)
                }

                //Setting the new ammo repository values to make it visual
                text_ammo_el.setAttribute("text",{value:text_ammo_value})
                
                //Verifying whether the number of bowling balls reamining is greater than zero or not
                ////Case-1 -The number of bowling balls is greater than zero
                if(text_ammo_value>0){

                //Creating an entity element
                bowling_ball_el=document.createElement("a-entity")

                //Adding a bowling ball gltf-model to the entity and a position slightly above ground
                bowling_ball_el.setAttribute("gltf-model","./models/ball/scene.gltf")
                bowling_ball_el.setAttribute("position","0 1.3 0")

                //Setting a random id to the entity
                bowling_ball_el.setAttribute("id",`ball${Math.random(0,1)}`)


                //Sourcing the scene element and and appending the entity as a child to it
                scene_el=document.querySelector("#scene_wrld")
                scene_el.appendChild(bowling_ball_el)

                //Adding an event listener to the entity that activates on the entity's collision
                bowling_ball_el.addEventListener("collide",(e)=>{

                   //Veriyfing whether the id of the collided body is "main_pin"
                   ////Case-1 -The id is "main_pin"
                   if(e.detail.body.el.id==="main_pin"){

                       //Sourcing the main pin element and removing it 
                       main_pin_el=document.querySelector("#main_pin")
                       main_pin_el.remove()

                       //Sourcing the plane element and setting the custom componet 'showPins'
                       plane_el=document.querySelector("#plane")
                       plane_el.setAttribute("pin-spawner",{showPins:true})

                       //Sourcing the text element and changing its "value property"
                       text_el=document.querySelector("#prompt_text")
                       text_el.setAttribute("text","value:HAHA YOU ARE NOW TRAPPED")

                       sky_el=document.createElement("a-sky")
                       sky_el.setAttribute("color","red")
                       this.el.appendChild(sky_el)
                   }

                  if(e.detail.body.el.id.includes("pin_e")){
   
                      pin_enemy_el=document.querySelector(`#${e.detail.body.el.id}`)
                      pin_enemy_el.setAttribute("dynamic-body",{"mass":0.2})
                      pin_enemy_el.removeAttribute("static-body")

                      var pin_impulse=new CANNON.Vec3(0,0,0)
                      var world_point=new CANNON.Vec3().copy(pin_enemy_el.getAttribute("position"))

                      pin_enemy_el.body.applyImpulse(pin_impulse, world_point)
                  } 
                })

                //Getting the camera's position
                camera_el_position=document.querySelector("#camera_player").object3D
                
                //Creating a vector, and integrating with the camera's
                var vectors= new THREE.Vector3()
                camera_el_position.getWorldDirection(vectors)

                //Make the bowling ball a dynamic body with velocity in the camera's direction
                bowling_ball_el.setAttribute("velocity",vectors.multiplyScalar(-7))
                bowling_ball_el.setAttribute("dynamic-body",{shape:"sphere",sphereRadius:"0.2"})

                //Adding an event listnener to deetect collisions between the pins and other objects
                this.el.addEventListener("collide",(e)=>{

                    //Verifying whether the target id includes "camera" and the body id has "pin_e" (enemy pin) in it
                    if(e.detail.target.el.id.includes("camera")&&e.detail.body.el.id.includes("pin_e")){

                        //Setting (Updating) the dynamic body attribute to the camera and increasing its mass to 0.3
                        camera_el.setAttribute("dynamic-body","mass:0.3")

                        //Creating a  text element that prompts the player on thier defeat
                        text_lost_el=document.createElement("a-entity")

                        //Asetting the text and position attributes to the text element
                        text_lost_el.setAttribute("text",{value:"YOU LOST",font:"exo2bold",align:"center",width:"18",color:"#8b0000"})
                        text_lost_el.setAttribute("position","0 0.5 -2")

                        //Appending the text element as a child to the camera element
                        camera_el.appendChild(text_lost_el)

                        //Setting the number of bowling balls left to zero to prevent the shooting mechanism
                        text_ammo_el.setAttribute("text",{value:"0"})

                        //Sourcing the text element for prompting that the ammo has run out nad removing it ultimately
                        empty_text_el=document.querySelector("#empty_text")
                        empty_text_el.remove()
                    }
                })
                } 
            }
        })
    },
})

//-----------------------------------------------------------------------shoot.js---------------------------------------------------------------//
//----------------------------------------------------------------Bowling Pin's Revenge----------------------------------------------------------------//
