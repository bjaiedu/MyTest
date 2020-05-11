namespace APDS9960{
    export enum Direction_type {
        //% block=None
        DIR_NONE = 0,
        //% block=UP
        DIR_UP = 1,
        //% block=DOWN
        DIR_DOWN = 2,
        //% block=LEFT
        DIR_LEFT = 3,
        //% block=RIGHT
        DIR_RIGHT = 4,
        //% block=NEAR
        DIR_NEAR = 5,
        //% block=FAR
        DIR_FAR = 6,
        //% block=ALL
        DIR_ALL = 7
    }

    export class apds9960{
        begin(x:number, y:number, z:number){
            return true
        }
        readGesture(){
            for(let i=0;i<6;i++){
                if(i == 1){
                    return Direction_type.DIR_DOWN
                }
                if (i == 2) {
                    return Direction_type.DIR_UP
                }
                if (i == 3) {
                    return Direction_type.DIR_LEFT
                }
                if (i == 4) {
                    return Direction_type.DIR_RIGHT
                }
            }
            return Direction_type.DIR_NONE
        }
        enableProximity(x:number){
            let aa = x;
        }
        enableGesture(x:number){
            let bb = x;
        }

    }
    const gestureEventId = 4100;
    let lastGetureValue = Direction_type.DIR_NONE;
    let apds = new apds9960();
    /**
     * get gesture
     */
    //% blockId="GET_GESTURE_VALUE" block="Gesture|%gesture"
    //% weight=100 color=#000012
    export function onGesture(gesture: Direction_type, handler: Action) {
        control.onEvent(gestureEventId, gesture, handler);
        if (apds.begin(10, 0x01, 0x39)) {
            apds.enableProximity(1);
            apds.enableGesture(1);
        } else {
            basic.showIcon(IconNames.No)
        }
        control.inBackground(() => {
            const gestureValue = apds.readGesture();
            if (gestureValue != lastGetureValue) {
                lastGetureValue = gestureValue;
                control.raiseEvent(gestureEventId, lastGetureValue)
            }
            basic.pause(10)
        })
    }

}
