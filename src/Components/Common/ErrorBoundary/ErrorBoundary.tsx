import { Component, ErrorInfo, FC } from "react";

export interface IErrorState { hasError: boolean, error: string }

export default class MyErrorBoundary extends Component<FC<{}>, IErrorState> {
  constructor(props: FC<{}>) {
    super(props)
    this.state = { hasError: false, error: "" }
  }

  static getDerivedStateFromError(err: Error): IErrorState {
    return { hasError: true, error: err.message }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(`inside componentDidCatch`);

  }

  render() {
    if (this.state.hasError) {
      return <div>Error Catch : {this.state.error}</div>
    }
    return this.props.children
  }
}