import React, { useState, useCallback, useEffect } from 'react'
import update from 'immutability-helper'
import { MenuCard } from './MenuCard'
import { solarizedDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import {
  getParentMenuOrder, getParentMenu, updateMenu
} from "../../redux/Actions/admin/menuActions/MenuAction";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-bootstrap';
import Loading from '../Loading/Loading';

const style = {
  width: 400,
}

const MenuContainer = (props) => {
  {
    const [cards, setCards] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      props.getParentMenuOrder((data) => {
        setCards(data)
        setLoading(false)
      });
    }, [])


    const moveCard = useCallback((dragIndex, hoverIndex) => {
      const dragCard = cards[dragIndex]
      setCards(
        update(cards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        }),
      )
    }, [cards])

    const renderCard = (card, index) => {

      return (
        <MenuCard
          key={card.id}
          index={index}
          id={card.id}
          text={card.name}
          moveCard={moveCard}
        />
      )

    }

    async function updateMenu() {
      cards.map(async (menuItem, index) => {
        const menuRequest = {
          parent_id: 0,
          menu_order: index,
          name: menuItem.name,
          link: menuItem.link
        }
        await props.updateMenu(menuItem.id, menuRequest)
      })
    }

    function onSaveChange() {
      updateMenu();
    }

    return (
      <>

        {loading ? <Loading /> : <div style={style}>
          {cards.map((card, i) => {
            return renderCard(card, i)
          })}
        </div>
        }
        <Button className="rounded-0" onClick={onSaveChange}>Save Change</Button>
      </>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    parentMenu: state.menuReducer.parentMenu,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    updateMenu,
    getParentMenuOrder,
    getParentMenu
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);