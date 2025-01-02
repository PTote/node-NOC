import { Server } from "./presentation/server";

const callMain = (async() => {
    main();
});

callMain();


function main(){
    Server.start();
}