;WITH 51MR / 51ME LED VERSION

;TEST PROGRAM FOR ALS-NIFC-07A - INTERRUPT MODE
;This program can be entered in the RAM location
;9500H and execute using GO command.

	;********************************************
	;PROGRAM TO STUDY ADC-0809 IN INTERRUPT MODE
	;********************************************

CONTROL EQU     2043H                   ;control port address for 8255
PORTA   EQU     2040H                   ;porta address for 8255
PORTB   EQU     2041H                   ;portb address for 8255
PORTC   EQU     2042H                   ;portb address for 8255
UPDD    EQU     677DH                   ;display routine addr in data field
DUMY	EQU	45H
TEMP2	EQU	47H

                ;INTERRUPT SERVICE ROUTINE

		ORG	8010H		;INT1 JUMP ADDR TO RAM
                LJMP    8600H

                ORG     8600H

		CLR	EA		;DISABLE GLOBAL

		
		MOV	DPTR,#CONTROL
		MOV	A,#0DH		;SET  PC6
		MOVX	@DPTR,A

		MOV	DPTR,#PORTA	;READ DIGITAL	VALUE
		MOVX	A,@DPTR
		MOV	R6,A
		LCALL	UPDD		;DISPLAY IT	

		MOV	TEMP2,#00H	;CLEAR FLAG
                SETB	EA		;AGAIN SET GLOBAL

		RETI

                ORG     9000H

		MOV	A,#90H
		MOV	DPTR,#CONTROL	;PORT a I/P,  PORT b,c O/P
		MOVX	@DPTR,A

		SETB	IT1		;SPECIFYING FALLING EDGE
					;TRIGGERED EXTERNAL INT1
		SETB	EX1		;ENABLES INT1
		SETB	EA		;ENABLE GLOBAL
AD00:
                MOV DUMY,#00H
                MOV DPTR,#F000H
                MOVX A,@DPTR
                MOV     DUMY,A        ;CHANNEL NUM
		NOP
		NOP

                MOV     TEMP2,#FFH      ;TEMP2 CONTAINS FLAG 
					;00 IN ISR,FF IN MAIN LOOP
		MOV     A,DUMY
		ANL A,#0FH

		MOV	DPTR,#PORTC	;OUT PUT CH NO
		MOVX	@DPTR,A

		MOV	DPTR,#CONTROL
		MOV	A,#0FH		;PC7 SET START\ALE
		MOVX	@DPTR,A

		MOV	R3,#30H		;30MSEC DEL
LOP:		MOV	R4,#FAH
LOP1:		NOP
		NOP
		DJNZ	R4,LOP1
		DJNZ	R3,LOP

		MOV	A,#0EH		;PC7 RESET
		MOVX	@DPTR,A
		NOP
		NOP

AD05:		MOV	A,TEMP2		;WAIT HERE FOR
		JB	ACC.7,AD05	;TEMP2 FLAG CLEAR IN ISR

                SJMP	AD00

		END
		
