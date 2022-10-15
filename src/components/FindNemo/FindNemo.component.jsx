import React from 'react'

const FindNemo = () => {
    const nemo = ["nemo"];
    const everyone = ["dory", "bruce", "marlin", "gill", "bloat", "nemo", "nigel", "squirt", "darla", "hank"];
    const largeArray = new Array(1000).fill("dory");
    largeArray.push("nemo");

    const findNemo = (array) => {
        let t0 = performance.now();
        for (var i = 0; i < array.length; i++) {
            if (array[i] === "nemo") {
                let t1 = performance.now();
                console.log("Call to find Nemo took " + (t1 - t0) + " milliseconds");
                return (<div>Found NEMO! In index: {i}</div>)
            }
        }
        let t1 = performance.now();
        console.log("Call to find Nemo took " + (t1 - t0) + " milliseconds");
        return (<div>Find nemo failed</div>)
    };

    return (
        <>
            <div>
                <h3>Finding nemo...</h3>
                {findNemo(largeArray)}
            </div>
        </>
    )
}

export default FindNemo;