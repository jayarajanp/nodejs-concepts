import * as fs from 'fs'
import { performance, PerformanceObserver } from 'perf_hooks'

export function findMedianOfTwoSortedArrays(nums1, nums2) {
    // nums1 = [1, 3, 5 ], nums2 = [2, 5, 6, 7, 8] => [1, 2, 3, 5, 6, 7, 8] => 3
    //       m           ,              n
    
    // TODO: Handle corner cases

    // Sub-optimal: O(m + n)
    const nums1Length = nums1.length;
    const nums2Length = nums2.length;
    
    let nums1Index = 0;
    let nums2Index = 0;
    
    const mergedNums = []
    
    while(true) {
        if (nums1Index === nums1Length && nums2Index < nums2Length) {
            mergedNums.push(...nums2.splice(nums2Index, nums2Length))
            break;
        } else if (nums2Index === nums2Length && nums1Index < nums1Length) {
            mergedNums.push(...nums1.splice(nums1Index, nums1Length))
            break;
        } else if (nums1Index === nums1Length && nums2Index === nums2Length) {
            break;
        }
        
        const nums1Element = nums1[nums1Index];
        const nums2Element = nums2[nums2Index];
        
        if (nums1Element > nums2Element) {
            mergedNums.push(nums2Element);
            nums2Index++;
        } else {
            mergedNums.push(nums1Element);
            nums1Index++;
        }
    }
    
    const lengthOfMergedNums = mergedNums.length;
    if (lengthOfMergedNums % 2 === 0) {
        const middleIndex = lengthOfMergedNums / 2;
        const middleIndexFirst = Math.floor(middleIndex - 1);
        const middleIndexSecond = Math.ceil(middleIndex);
        
        return (mergedNums[middleIndexFirst] + mergedNums[middleIndexSecond])/2;
    } else {
        const middleIndex = lengthOfMergedNums / 2;
        return mergedNums[Math.floor(middleIndex)];
    }

    // TODO: Optimal: O(log(m+n))
}

export function findTwoSumsSolution(nums, target) {
    // [1,0,2,6] ---> [0,1,2,6]
    // 5 ---> 
    
    // Brute force: O(n + (n-1) + (n-2) + ...) = O(n^2)
    // for (let i = 0; i < nums.length; i++) {
    //     for (let j = i + 1; j < nums.length; j++) {
    //         const sum = nums[i] + nums[j]
    //         if (sum === target) {
    //             return [i, j]
    //         }
    //     }
    // }
    // return [];
    
    // Optimal: O(n)
    const memoryStore = {}; // Could use 'const memoryStore = new Map();' instead. Map was introduced in ES6
    const arrayLength = nums.length; // Always do such calculations outside and store in a variable to reduce complexity

    for (let i = 0; i < arrayLength; i++) {
        const complementElement = target - nums[i];
        if (complementElement in memoryStore) {
            return [i, memoryStore[complementElement]]
        }
        memoryStore[nums[i]] = i;
    }
    return [];
}

export function printImportantGlobals() {
    console.log('global (top of the hierarchy under which all globals are present and custom globals could be made): - \n', global);
    console.log('process (consists of process details): - \n', process);
    console.log('process.env (a property of process to store envirnoment variables): - \n', process.env);
    console.log('process.argv (a property of process which has arguments): - \n', process.argv);
}

export function checkIfFileExists(fileName, doSynchronously) {
    // fs.exists() deprecated
    if (doSynchronously) {
        try {
            const fileStat = fs.statSync(fileName);
            console.log(fileStat);
        } catch (ex) {
            console.log('Exception: ', ex)
        }
    } else {
        fs.stat(fileName, (err, fileStat) => {
            if (err) {
                console.log('Error: ', err);
            } else {
                console.log(fileStat);
            }
        });
    }
}

export function readFromFile(fileName, doSynchronously) {
    if (doSynchronously) {
        try {
            const data = fs.readFileSync(fileName, { encoding: 'utf-8' })
            console.log(data);
        } catch (ex) {
            console.log('Exception: ', ex)
        }
    } else {
        fs.readFile(fileName, { encoding: 'utf-8' }, (err, data) => {
            if (err) {
                console.log('Error: ', err);
            } else {
                console.log(data);
            }
        });
    }
}

export function writeToFile(fileName, doSynchronously) {
    if (doSynchronously) {
        try {
            fs.writeFileSync(fileName, 'Some data');
        } catch (ex) {
            console.log('Exception: ', ex)
        }
    } else {
        fs.writeFile(fileName, (err) => {
            if (err) {
                console.log('Error: ', err);
            }
        });
    }
}

export function appendToFile(fileName, doSynchronously) {
    if (doSynchronously) {
        try {
            fs.appendFileSync(fileName, 'More data');
        } catch (ex) {
            console.log('Exception: ', ex)
        }
    } else {
        fs.appendFile(fileName, (err) => {
            if (err) {
                console.log('Error: ', err);
            }
        });
    }
}

export function deleteFile(fileName, doSynchronously) {
    if (doSynchronously) {
        try {
            fs.unlinkSync(fileName)
        } catch (ex) {
            console.log('Exception: ', ex)
        }
    } else {
        fs.unlink(fileName, (err) => {
            if (err) {
                console.log('Error: ', err);
            }
        });
    }
}

export function findMissingNumberInUnsortedArray(arr) {
    // [3,2,1,4,8,6,7,5,10] ---> 9 is the missing number here (in the range of 1-10)
    if (arr.length === 0 || !arr) {
        throw ('Array is empty');
    }

    // Brute Force (without sorting) - O(n^2), where n is the maximum number
    // let numberToBeSearched = 1
    // for (let i = 0; i < arr.length; i++) {
    //     for (let j = 0; j < arr.length; j++) {
    //         if (arr[j] === numberToBeSearched) {
    //             numberToBeSearched++
    //             break
    //         }

    //         if (j === arr.length - 1) {
    //             return numberToBeSearched
    //         }
    //     }
    // }

    // Brute Force (with sorting) - O(nlogn + n)
    // arr.sort((a, b) => a - b)
    // let numberToBeSearched = 1
    // for (let i = 0; i < arr.length; i++) {
    //     if (arr[i] === numberToBeSearched) {
    //         numberToBeSearched++
    //         continue
    //     }

    //     if (i === arr.length - 1) {
    //         return numberToBeSearched
    //     }
    // }

    // Optimal - O(n)
    const n = arr.length + 1;
    const expectedSum = (n * (n + 1)) / 2;
    const actualSum = arr.reduce((acc, ele) => acc + ele);
    return (expectedSum - actualSum);
}

export function mapAndFilterArray() {
    const arrayOfItemsAndPrices = [
        { item: 'Car', price: 50 },
        { item: 'Book', price: 20 },
        { item: 'Phone', price: 30 }
    ];

    const arrayOfItems = arrayOfItemsAndPrices.map((itemAndPrice) => {
        return itemAndPrice.item;
    })

    console.log(arrayOfItems)

    const arrayOfItemsAndPricesLessThanForty = arrayOfItemsAndPrices.filter((itemAndPrice) => {
        return itemAndPrice.price < 40;
    })

    console.log(arrayOfItemsAndPricesLessThanForty);

    /* Other important array methods: 
    every - returns true if every element in array satisfies the condition
    some - returns true if any element in array satisfies the condition 
    includes - returns true if an element is present in the array
    forEach - iterates through the array */
}

export function addArrayElementsUsingReduceMethod(arr) {
    // 'reduce' does some operations on the array and returns the accumulated result of all those operations
    const sum = arr.reduce((accumulator, element) => accumulator + element);
    console.log(sum);
}

export function bindFunction() {
    const obj = {
        x: 4,
        getX() {
            // const inner = () => {
            //     console.log(this.x) // ES6: Would work with inner() call because of arrow
            // }

            const inner = function () {
                console.log(this.x) // Non-ES6: Would not work unless caller binds the object
            }

            inner.bind(this)() // Non-ES6: Would not work with a simple inner() call
        }
    }

    obj.getX();
}

export function deepClone() {
    const obj = {
        a: {
            b: {
                c: 5
            }
        }
    };

    // const clone = Object.assign({}, obj) ---> This would shallow clone only (one-level copied, other levels referenced)

    const clone = JSON.parse(JSON.stringify(obj));

    obj.a.b.c = 55;

    console.log(clone);
}

export function measurePerformance() {
    const perfObserver = new PerformanceObserver((items) => {
        items.getEntries().forEach((entry) => {
            console.log(entry);
        })
    })

    perfObserver.observe({ entryTypes: ['measure'], buffer: true });

    performance.mark('start');
    performance.mark('stop');
    performance.measure('test', 'start', 'stop');
}

export function extendArray() {
    Array.prototype.print = function print() { console.log(this.join(',')) };
    let arr = [1, 2];
    arr.print();
}

export function printValuesInObject() {
    const x = {
        a: 1,
        b: 2
    };

    const xArr = [];

    for (let i in x) {
        xArr.push(x[i])
    }

    console.log(xArr);

    // console.log(Object.values(x)); ---> This would work too
}

export function findMaxDifferenceBetweenSuccessiveElementsAfterSorting(array) {
    // Complexity: O(nlogn)
    try {
        if (array.length < 1) {
            throw ('No elements present'); // throw new Error('No elements present') ---> Full call stack
        }

        array.sort((a, b) => a - b); // O(nlogn) [Node uses tim sort, a variation of merge sort]

        let maximumDifference = 0;
        for (let i = 0; i < array.length; i++) { // O(n)
            if (i == array.length - 1) {
                break;
            }

            let difference = array[i + 1] - array[i];
            if (difference > maximumDifference) {
                maximumDifference = difference;
            }
        }

        return maximumDifference;

    } catch (ex) {
        console.log(ex);
        return -1;
    }
}

export function addAtBeginningAndEndOfArray(array, beginningChar, endChar) {
    array.unshift(beginningChar);
    array.push(endChar);

    // Using spread operator: -
    // array = [beginningChar, ...array, endChar];

    return array
}

export function reverseString(inputString) {
    const arrayOfChars = inputString.split('');
    arrayOfChars.reverse();
    const reversedString = arrayOfChars.join('');

    // Convoluted Way: -
    // let reversedString = ''
    // for (let char of inputString) {
    //     reversedString = char + reversedString;
    // }

    return reversedString
}