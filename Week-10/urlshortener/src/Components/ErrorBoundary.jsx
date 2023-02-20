import React, { Component } from 'react'
import Spinner from './Spinner'

class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        //sets initial state to false (no error)
        this.state = {
            hasError: false
        }
    }
    //if error occurs it is caught here
    static getDerivedStateFromError(error) {
        return { hasError: true }
    }
    //logs error
    componentDidCatch(error, info) {
        console.log(error)
        console.log(info)
    }
    render() {
        //if error doesnt occur, value of this.state.hasError = true hence show error spinner
        //else retrun and render the children of Error Boundary componenet
        if (this.state.hasError) {
            return (
                <div className="bg-black text-center text-white border-top pt-4 pb-5">
                    <h2 className="pb-2">Something went wrong. Try again.</h2>
                    <Spinner></Spinner>
                </div>
            )       
        }
        return this.props.children
    }
}
export default ErrorBoundary