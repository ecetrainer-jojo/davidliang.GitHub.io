import { CANVAS_WIDTH_DEFAULT,CANVAS_HEIGHT_DEFAULT} from './constants.js'
import { Character } from './Character/Character.js'
import { Background } from './Background/backgroud.js'
import { ComponentController } from './ComponentControl/ComponentControl.js'
import { MotionController } from './MotionControl/MotionControl.js'

export const canvasInit = ()=>{
    console.log("canvas init start")
    const canvas = document.querySelector('#gameCanvas') || document.querySelector('canvas')
    if(canvas) {
        // Fill the hero section viewport
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        ProcessContent()
    }
}

export const ProcessContent = async()=>{
    console.log("content Process Start")
    const componentController = new ComponentController()
    await componentController.initialize()
    const motionController = new MotionController(componentController.getCharacter(),componentController.getBackground())
}

export const DrawGameContent = (imageSrc)=>{
    //get and set image resources
    const mapImage = new Image()
    mapImage.src = imageSrc

    const playerImage = new Image()
    playerImage.src = 'img/Front Stand.png'
    let character
    let backgroud
    mapImage.onload = ()=>{
        character = new Character(INIT_CHARACTER_X,INIT_CHARACTER_Y,playerImage)
        backgroud = new Background(INIT_PALLET_X,INIT_PALLET_Y,mapImage)
        animate()
    }
    const animate = () =>{
        window.requestAnimationFrame(animate)
        backgroud.draw()
        character.draw()
    }
    window.addEventListener('keydown',(event) => {
        if(event.key==='w'||event.key === 'ArrowUp'){
            console.log("up")
            //background move down
            backgroud.moveDown()
            character.changeDirection(Direction.Up)
        }
        else if(event.key==='s'||event.key === 'ArrowDown'){
            backgroud.moveUp()
            character.changeDirection(Direction.Down)
        }
        else if(event.key==='a'||event.key === 'ArrowLeft'){
            backgroud.moveRight()
            character.changeDirection(Direction.Left)
        }
        else if(event.key==='d'||event.key === 'ArrowRight'){
            backgroud.moveLeft()
            character.changeDirection(Direction.Right)
        }
    })
}


