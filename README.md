Function nest:
- Creates object inside object as keys indicate
- Changes oryginal object if provided
- Creates "leafs" at the end of the path indicated by keys

Usage examples:

1. Running the function with no arguments will return an empty object.

```javascript
nest()

{}
```

---

2. Crete an object from an array of keys (with an empty object as leaf):

```javascript
nest({ keys:['a',2 ,'5', 'c'] })

{
    "a": {
        "2": {
            "5": {
                "c": {}
            }
        }
    }
}
```

---

3. Crete an object from an array of keys and initialize leafs with a string:

```javascript
nest({ keys:['a', 2 ,'5', 'c'], leaf: "end" })

{
    "a": {
        "2": {
            "5": {
                "c": "end"
            }
        }
    }
}
```

---

4. Modify an existing object:

```javascript
nest({ obj:{a:{2:{'t':'y'}}}, keys: ['a',2,'5'], leaf:'leaf' })
    
{
    "a": {
        "2": {
            "5": "leaf",
            "t": "y"
        }
    }
}
```

---

5. Modify an existing object:

```javascript
const testObj = {'a':{}, 'b':{}, 'c':{}};
const res = nest({ obj:testObj, keys: ['b','b2','b3'], leaf:'b-end' })
console.log({testObj})
console.log({res});

{
    "testObj": {
        "a": {},
        "b": {
            "b2": {
                "b3": "b-end"
            }
        },
        "c": {}
    }
}

{
    "res": {
        "a": {},
        "b": {
            "b2": {
                "b3": "b-end"
            }
        },
        "c": {}
    }
}
```

Notice: testObj and res are the same object

```javascript
testObj === res
true
```

---

6. Convert an array of objects into an object of objects:

```javascript
const sample = [
    {item: 'item1', group: 'Group2', price: 400},
    {item: 'item2', group: 'Group1', price: 300},
    {item: 'item3', group: 'Group2', price: 200},
    {item: 'item4', group: 'Group2', price: 100},
    {item: 'item5', group: 'Group1', price: 100},
    {item: 'item6', group: 'Group3', price: 100},
];

const result = {};

sample.forEach(({group, item, price}) => {
    nest({obj:result, keys:[group, item], leaf:price});
});

console.log(result);

{
    "Group2": {
        "item1": 400,
        "item3": 200,
        "item4": 100
    },
    "Group1": {
        "item2": 300,
        "item5": 100
    },
    "Group3": {
        "item6": 100
    }
}
```

---

7. Convert an array of objects into an object of objects:

```javascript
const sample = [
    {item: 'item1', group: 'Group2', price: 400},
    {item: 'item2', group: 'Group1', price: 300},
    {item: 'item3', group: 'Group2', price: 200},
    {item: 'item4', group: 'Group2', price: 100},
    {item: 'item5', group: 'Group1', price: 100},
    {item: 'item6', group: 'Group3', price: 100},
];

const result = {};

sample.forEach(({group, item, price}) => {
    nest({obj:result, keys:[price, group], leaf:item});
});

console.log(result);

{
    "100": {
        "Group2": "item4",
        "Group1": "item5",
        "Group3": "item6"
    },
    "200": {
        "Group2": "item3"
    },
    "300": {
        "Group1": "item2"
    },
    "400": {
        "Group2": "item1"
    }
}
```

## Errors examples:

1. This will throw an error because there is d:'hi' endpoint and nest function cannot create a new object in a string.

```javascript
const a = {b:{c:{d:'hi'}}};
console.log(nest({obj:a, keys:['b', 'c', 'd', 'e','f','g'], leafInit: "end"}));
```

Output:

```
Uncaught Error: hi is not an object and cannont nest in it
```

---

2. Cannot create string from {'c','d'}, so cannot create key

```javascript
nest({ keys: ['a', 2,'5',{'c','d'}] })
```

Output:
```
Uncaught SyntaxError: Unexpected string
```

---

3. Cannot init leaf more than once

```javascript
const y = {};

nest({obj:y, keys:['a','b'], leaf:'y'});

{
    "a": {
        "b": "y"
    }
}

nest({obj:y, keys:['a','b'], leaf:'y'});
```

```
Uncaught Error: y is not an object and cannont nest in it
```