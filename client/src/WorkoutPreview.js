import './WorkoutPreview.css'
import React from "react";
import {Link} from "react-router-dom";

class WorkoutPreview{

    constructor(props) {
        this.name = props.name
        this.time = props.time
        this.diff = Math.round(props.difficulty)
        this.targets = props.targets
        this.equip = props.equipment
        this.exercises = props.exercises //each exercise is an array [name, time]
        this.cycles = props.cycles
        //this.renderTargets = this.renderTargets.bind(this)
    }

    //renders target areas
    renderTargets() {
        let tagDivs = []
        if (this.targets !== undefined) {
            this.targets.forEach((t) => {
                tagDivs.push(<div id="targetTag" className="Tag">{t}</div>)
            })
        }
        return tagDivs
    }

    //renders target areas
    renderEquip() {
        let tagDivs = []
        if (this.equip !== undefined) {
            if (this.equip.length === 1) {
                tagDivs.push(<h4>No equipment necessary!</h4>)
            } else {
                this.equip.forEach((e) => {
                    tagDivs.push(<div id="equipTag" className="Tag">{e}</div>)
                })
                tagDivs.shift() //remove random extra empty tag at the beginning
            }
        }
        return tagDivs
    }

    renderExercises() {
        let exDivs = []
        let currExNum = 0;
        if (this.exercises !== undefined) {
            this.exercises.forEach((ex) => {
                currExNum = currExNum + 1

                console.log("name: " + ex[0])
                console.log("currExNum: " + currExNum)


                if (ex[0] != 'Rest') {
                    if (currExNum == this.exercises.length) {
                        exDivs.push(<h4 id="preview-exercises">{ex[0]}, and more...</h4>)
                    } else {
                        exDivs.push(<h4 id="preview-exercises">{ex[0]}, </h4>)
                    }
                } else {
                    //if exercise is Rest and it's the last one
                    if (currExNum == this.exercises.length) {
                        exDivs.push(<h4 id="preview-exercises">and more...</h4>)
                    }
                }
            })
        }
        return exDivs
    }

    //closes preview modal
    closePreview() {
        //remove stuff inside so they are not re-rendered when opened again
        //
        document.getElementById("workoutPreview").style.display = "none";
    }

    //renders workout preview modal
    renderPreview() {
        //console.log("rendering preview name: " + this.name)
        return (
            <div id="workoutPreview" className="workout-preview-background">
                <div className="workout-preview">
                    <span className="close" onClick={this.closePreview}>Close &times;</span>
                    <h1>{this.name}</h1>
                    <div id="wrapper">
                        <div id="left">
                            <h2>Time: {Math.ceil(this.time / 60)} minutes</h2>
                            <h2>Difficulty: {this.diff}/100</h2>
                            <h2>Target Areas</h2>
                            {this.renderTargets()}
                        </div>
                        <div id="right" >
                            <h2>Equipment</h2>
                            {this.renderEquip()}
                            <h2>Exercises</h2>
                            {this.renderExercises()}
                        </div>
                    </div>
                    <Link to={{
                        pathname: "/Workout", //goes to workout in progress component
                        state: {
                            exercises: this.exercises,
                            cycles: this.cycles
                        }
                    }}>
                        <button id='start'>Start!</button>
                    </Link>
                </div>
            </div>
        )
    }

    toString() {
        return this.name
    }

}

export default WorkoutPreview;