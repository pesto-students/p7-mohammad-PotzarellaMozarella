
//reducer method
function add(a,b) {
   return a+b;
}

//memoize function to reduce time
function memoize(fn) {
    const cache = new Map();
    return function(...args) {
        const key = args.toString();
        console.log(`fn was called with+ ${key}`);
        console.log(cache);
        if(cache.has(key)) {
            cache.get(key);
        }
        else {
            cache.set(key, fn(...args));
        }
        return cache.get(key);
    }
}

const memoizeAdd = memoize(add);

//to print execution time for the function run
function time(fn)
{
    console.time();
    fn();
    console.timeEnd();
}

//calling memoize function to test outputs
time(()=> memoizeAdd(100,100));
time(()=> memoizeAdd(100,100));
time(()=> memoizeAdd(100,100));
time(()=> memoizeAdd(100,100));
time(()=> memoizeAdd(200,100));
time(()=> memoizeAdd(100,200));
time(()=> memoizeAdd(200,100));
time(()=> memoizeAdd(200,100));


