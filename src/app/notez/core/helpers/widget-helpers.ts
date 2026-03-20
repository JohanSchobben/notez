import {Widget} from '../models/widget';

export const getRightPositionOfWidget = (widget: Widget): number => widget.position.x + widget.size.width
export const getBottomPositionOfWidget = (widget: Widget): number => widget.position.y + widget.size.height
