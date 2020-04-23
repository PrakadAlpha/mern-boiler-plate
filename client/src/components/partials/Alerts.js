import React from 'react'
import {useSelector} from 'react-redux'

const Alerts = () => {

  const alertsList = useSelector(state => state.alert);

  return (
    alertsList.length > 0 && 
    alertsList.map(alert => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <i className="fas fa-info-circle"/> {alert.message}
      </div>
    ))
  )
}

export default Alerts