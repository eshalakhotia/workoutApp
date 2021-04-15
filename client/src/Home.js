import React from 'react';
import './Home.css';
import Sidebar from './Sidebar';
import Questionnaire from "./Questionnaire";
import {Link, Redirect} from "react-router-dom";
import WorkoutPreview from "./WorkoutPreview";
import WorkoutDiv from "./WorkoutDiv";

/**
 * Home screen/profile
 */
class Home extends React.Component {

    constructor(props) {
        super(props);
        this.username = props.location.state.username
        this.user = props.location.state.user
        this.pastWorkouts = this.user.pastWorkouts
        this.questionnaire = new Questionnaire();
        this.state = {
            workoutPreview : new WorkoutPreview({name: '', time: ''})
        }
    }

    componentDidMount() {
        document.getElementById("main").style.marginLeft = "300px";
    }

    //opens Questionnaire modal when needed
    openQuestionnaire() {
        document.getElementById("questionnaire").style.display = "block";
    }


    //display preview component 'info' associated with clicked WorkoutDiv
    openWorkoutPreview(info) {
        this.setState(() => {
            return {
                workoutPreview: info
            }
        })
        document.getElementById("workoutPreview").style.display = "block";
    }

    renderWorkouts() {
        if (this.pastWorkouts != null) {
            console.log("rendering workouts: " + this.pastWorkouts.length)
            console.log("rendering workouts: " + this.pastWorkouts)
            const workouts = this.pastWorkouts.map((result) => {

                const exercises = []
                result.exercises.forEach((ex) => {
                    exercises.push([ex.name, ex.time])
                })

                return{
                    name: result.name, time: result.workoutTime, difficulty: result.workoutDifficulty,
                    targets: result.targetAreas, equipment: result.equipment, exercises: exercises,
                    cycles: result.numCycles
                }
            })

            let workoutDivs = []
            for (const workout of workouts) {
                const workoutPreview = new WorkoutPreview(
                    {name: workout.name, time:workout.time, difficulty: workout.difficulty,
                        targets:workout.targets, equipment: workout.equipment, exercises: workout.exercises,
                        cycles: workout.cycles})

                //create workout thumbnail with associated Preview component
                const workoutDiv = new WorkoutDiv( {open: this.openWorkoutPreview.bind(this),
                    preview: workoutPreview});

                workoutDivs.push(workoutDiv.renderWorkout({
                    className: "Workout", name: workout.name, time:workout.time,
                    difficulty: workout.difficulty, targets:workout.targets, equipment: workout.equipment,
                    openWorkout: this.openWorkoutPreview
                }))

            }
            if (workouts.length === 0 ){
                workoutDivs.push(<span>You have no past workouts. Go to Find Workouts on the left to get some recommendations!</span>
                )
            }

            return workoutDivs
        }
    }

    //renders Homepage/profile
    render() {
        return (
            <div id="Home" className="Home">
                <Sidebar className="Sidebar" findWorkouts={this.openQuestionnaire}/*closeNav={this.closeNav} openNav={this.openNav}*//>
                <div id="main">
                    <div id="logout">
                        <Link to={{
                            pathname: "/",
                            state: {
                                input: this.input
                            }
                        }}>
                            <button id='logOutButton'><span>Log Out!</span></button>
                        </Link>
                    </div>
                    <h1>Welcome Back, {this.username}!</h1>
                    <div id="past-workouts">
                        <h2>Your Workouts</h2>
                        {this.renderWorkouts()}
                    </div>
                    <div id="achievements">
                        <h2>Your Achievements</h2>
                    </div>
                </div>
                {this.state.workoutPreview.renderPreview()}
                {this.questionnaire.renderQuestionnaire()};
            </div>
        );
    }
}

export default Home;


/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
/*openNav() {
    document.getElementById("mySidenav").style.width = "300px";
    document.getElementById("main").style.marginLeft = "300px";
    document.getElementById("mySidenav").getElementsByClassName("closebtn")[0].style.display = "block";
    document.getElementById("mySidenav").getElementsByClassName("openbtn")[0].style.display = "none";
    document.getElementById("mySidenav").getElementsByClassName("links")[0].style.display = "block";
}*/

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
/*closeNav() {
    document.getElementById("mySidenav").style.width = "80px";
    document.getElementById("main").style.marginLeft = "80px";
    document.getElementById("mySidenav").getElementsByClassName("closebtn")[0].style.display = "none";
    document.getElementById("mySidenav").getElementsByClassName("openbtn")[0].style.display = "block";
    document.getElementById("mySidenav").getElementsByClassName("links")[0].style.display = "none";
}*/



/*closeFindWorkouts() {
    document.getElementById("questionnaire").style.display = "none";
}*/
