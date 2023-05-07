function objOrErr(obj){
    if( Object.prototype.toString.call(obj) !== '[object Object]' ){
        throw new Error(`${obj} is not an object and cannont nest in it`);
    }
}

function arrOrErr(arr){
    if( !Array.isArray(arr) ){
        throw new Error('Second argument (keys) must be an array');
    }
}


function nest({obj={}, keys = [], leaf={}}={}) {

    // Outer function to check arguments,
    // keep orgObj private and
    // call recursive function

    objOrErr(obj);
    arrOrErr(keys);

    return nestMain(obj, keys, leaf);

    // Recursive function to create a nested object with the given keys
    function nestMain(obj, keys, leaf, orgObj) {

        if (keys.length === 0) { // End of recursion
            return orgObj || obj;
        }
        
        if( obj[keys[0]] === undefined ){ // There is no such key yet
            if(keys.length === 1){ // If it is the last key
                obj[keys[0]] = leaf; // Create last key with leaf value
            } else {
                obj[keys[0]] = {}; // Create new empty object
            }
        } else {
            objOrErr(obj[keys[0]]); // There is such key, check if value is an object
        }

        return nestMain(
            obj[keys[0]], // Pass new object to next recursion
            keys.slice(1), // Pass keys without first one to next recursion
            leaf,
            orgObj || obj); // Pass object to next recursion so it can be returned at the end
    }
}