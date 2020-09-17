/** @format */

import { Component, ReactNode } from "react";

type Props = {
  children: ReactNode;
  renderError: (error: Error | null, retry: () => void) => ReactNode;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

export default class ErrorBoundary extends Component<Props, State> {
  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  state = {
    hasError: false,
    error: null,
  };

  async componentDidCatch(error: Error) {
    console.error(error);
  }

  render() {
    return this.state.hasError
      ? this.props.renderError(this.state.error, () => {
          this.setState({ hasError: false, error: null });
        })
      : this.props.children;
  }
}
