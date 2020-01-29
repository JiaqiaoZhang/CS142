'use strict';

function cs142MakeMultiFilter(originalArray) {
    let currentArray = originalArray;
    function arrayFilterer(filterCriteria, callback) {
        if(!filterCriteria){
            return currentArray;
        }
        currentArray = currentArray.filter(filterCriteria);
        if(callback){
            callback.call(originalArray, currentArray); // set this to originalArray, argument is currentArray
        }
        return arrayFilterer;
    }
    return arrayFilterer;

}


