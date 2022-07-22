import { clear } from '@testing-library/user-event/dist/clear';
import React, { useState, useRef, useEffect } from 'react'

const Timer = (props) => {

	const Ref = useRef(null);


	const getTimeRemaining = (e) => {
		const total = Date.parse(e) - Date.parse(new Date());
		const seconds = Math.floor((total / 1000) % 60);
		const minutes = Math.floor((total / 1000 / 60) % 60);
		const hours = Math.floor((total / 1000 / 60 / 60) % 24);
		return {
			total, hours, minutes, seconds
		};
	}


	const startTimer = (e) => {
	
		let { total, hours, minutes, seconds }
					= getTimeRemaining(e);
		
		if (total >= 0) {
			!props.restart &&
			props.setTimer(
				(hours > 9 ? hours : '0' + hours) + ':' +
				(minutes > 9 ? minutes : '0' + minutes) + ':'
				+ (seconds > 9 ? seconds : '0' + seconds)
			)
		}
	}

	const clearTimer = (e) => {

		props.setTimer('00:00:30');

		if (Ref.current) clearInterval(Ref.current);
		const id = setInterval(() => {
			startTimer(e);
		}, 1000)
		Ref.current = id;
	}

	const getDeadTime = () => {
		let deadline = new Date();


		deadline.setSeconds(deadline.getSeconds() + 30);
		return deadline
	}

	const reset = () => {
		if(props.timer === '00:00:00' || props.tenzies === true){
			props.setButton("New Game")
			props.setRestart(prev => true)
			props.setTenzies(true)

		}
		
	}
	//console.log(props.restart)
	useEffect(() => {

		clearTimer(getDeadTime())
			
	},[props.restart])

	useEffect(() => {
		reset()
	})

	
	return (
		<div>
			<h2>{props.timer}</h2>
		</div>
	)
}

export default Timer;
