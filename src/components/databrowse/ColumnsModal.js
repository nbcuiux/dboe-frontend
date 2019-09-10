import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


import iconColumns from '../../assets/images/icon-columns.svg';
import iconOrderCols from '../../assets/images/icon-ordercols.svg';

const getItemStyle = (isDragging, draggableStyle) => ({
  // Add border when item is dragging
  border: isDragging ? '1px solid #4E79AC' : '',
  // styles we need to apply on draggables
  ...draggableStyle,
});

class ColumnsModal extends Component {
 
  componentDidMount() {
    // Add event listener when modal is opened
    document.body.addEventListener('keydown', this.handleKeyDown);
  } 

  componentWillUnMount() {
    // Remove event listener when modal is closed
    document.body.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    // Close Modal on Escape key press
    if (e.keyCode === 27)
      this.props.closeColumnsModal();
  }

  render() {
    const showColumnModal = this.props.columnsModalState ? 'opened' : '';
    const columnOrder = this.props.columnOrder;
    // console.log(this.refs)
    // this.props.removeParamFromCol; Removes the item from the state!
    return (
      <div className={`modal ${showColumnModal}`}>
        <div className="modal__bg" onClick={this.props.closeColumnsModal}></div>
        <div className="modal__content">
          <div className="modal__content--header">
            <h2 className="modal__headline"><img src={iconColumns} alt="Icon Columns"/> Edit Columns</h2>
            <span className="modal__btn--close" onClick={this.props.closeColumnsModal}></span>
          </div>
          <div className="modal__content--body">
            <div className="modal-wires__content">
              <div className="modal-wires__content--col1">
                <div className="modal-wires__header">
                  <h4 className="modal-wires__header--title"><img src={iconOrderCols} alt="Icon: Order Columns"/> Order Columns</h4>
                </div>
                <div className="modal-wires__body--draglist">
                  <DragDropContext onDragEnd={this.props.columnOrderDragEnd}>
                    <Droppable droppableId="droppable">
                      {(provided, snapshot) => (
                        <div className="draggable__list" ref={provided.innerRef}>
                          {columnOrder.map((item, index) => (
                            <Draggable key={item.name} draggableId={item.name} index={index}>
                              {(provided, snapshot) => (
                                <div className="draggable__item"
                                  ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                  style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)} >
                                  <svg className="draggable__item--icon" width="13px" height="13px" viewBox="0 0 13 13">
                                    <line x1="1.5" y1="5" x2="11.5" y2="5"/>
                                    <line x1="1.5" y1="8" x2="11.5" y2="8"/>
                                  </svg>
                                  <span className="draggable__item--text">{item.name}</span>
                                  <span className="draggable__item--remove" onClick={(e)=>this.props.removeParamFromCol(e, item)} value={item}>
                                    <svg id={`drag_${item.name}`}  className="draggable__item--remove--svg" width="14px" height="14px" viewBox="0 0 14 14">
                                      <line x1="2" y1="2" x2="10" y2="10"/>
                                      <line x1="2" y1="10" x2="10" y2="2"/>
                                    </svg>
                                  </span>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </div>
              </div>

              <div className="modal-wires__content--col2">
                <div className="modal-wires__header">
                  <h4 className="modal-wires__header--title"><i className="fa fa-th-list"></i> Add or Remove Columns</h4>
                  <label className="modal-wires__header--checkbox" htmlFor="modalWiresSelectAll">
                    Select All
                    <input type="checkbox" id="modalWiresSelectAll" name="modalWiresSelectAll" onChange={(e)=> this.props.selectAllParams(e)}/>
                    <span></span>
                  </label>
                </div>
                <div className="modal-wires__body--categories">
                  {this.props.allParameters.map((item, index) => (
                    <div key={index} className="modal-wires__category">
                      <div className="modal-wires__catheader">
                        <h4 className={`modal-wires__category-headline--${item.catid}`}>{item.label}</h4>
                        <label htmlFor={`wiresmodalcat-${item.catid}`} className="modal-wires__catheader--checkbox" key={index}>
                            <input 
                              type="checkbox" 
                              id={`wiresmodalcat-${item.catid}`}
                              checked={item.selected}
                              name={`wiresmodalcat-${item.catid}`}
                              value={item.options}
                              onChange={(e)=>this.props.groupSelect(e, item)}/>
                            <span></span>
                          </label>
                      </div>
                      <div key={index} className="modal-wires__category--items">
                        {item.options.map((subitem, subindex) => (
                          <label htmlFor={`check_${subitem.key}`} className="modal-wires__checkbox" key={subindex}>
                            {subitem.name}
                            <input 
                              type="checkbox" 
                              id={`check_${subitem.key}`} 
                              name={subitem.name} 
                              checked={subitem.selected}
                              value={subitem.key} 
                              selected={item.selected}
                              onChange={(e)=>this.props.addParamToCol(e, subitem, item, index)}/>
                            <span className="modal-wires__checkbox--box"></span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="modal__content--footer">
            <span onClick={this.props.handleColumnUpdate} className="modal__btn--large"><i className="fa fa-sync-alt"></i>Apply</span>
          </div>
        </div>
      </div>
    );
  }
}

export default ColumnsModal;
