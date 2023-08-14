import React from 'react';
import { Box } from '@mui/material';
import { Dimensions } from './RenderDimensions';

export interface IDocumentingRendererProps<T> {
  item: T;
  dimensions: Map<T, Dimensions>;
  callback: (item: T, dim: Dimensions) => void;
  renderFunc: (item: T) => any;
}

export default class DocumentingRenderer<T> extends React.Component<
  IDocumentingRendererProps<T>,
  {
    childRef: any;
  }
> {
  childRef: any;

  constructor(props: any) {
    super(props);
    this.childRef = React.createRef();
  }

  shouldComponentUpdate(
    nextProps: Readonly<IDocumentingRendererProps<T>>,
    nextState: Readonly<{ childRef: any }>,
    nextContext: any
  ): boolean {
    if (nextProps.item !== this.props.item || !nextProps.dimensions.has(nextProps.item)) {
      return true;
    }
    const nextDims = nextProps.dimensions.get(nextProps.item)!;
    const currDims = this.props.dimensions.get(this.props.item)!;
    return nextDims.every((val, i) => val === currDims[i]);
  }

  componentDidUpdate() {
    this.props.callback(
      this.props.item,
      [this.childRef.current!.clientWidth, this.childRef.current!.clientHeight],
    );
  }

  render() {
    const { item, callback, renderFunc } = this.props;

    return (
      // shed all excess height and width
      <Box ref={this.childRef} height="max-content" width="max-content">
        {renderFunc(item)}
      </Box>
    );
  }
}
