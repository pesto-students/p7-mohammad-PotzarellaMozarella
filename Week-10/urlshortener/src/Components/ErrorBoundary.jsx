import React, { Component } from 'react'
import Spinner from './Spinner'

export class ErrorBoundary extends Component {
    constructor(props) {
        super(props)

        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    componentDidCatch(error, info) {
        console.log(error)
        console.log(info)
    }

    render() {
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