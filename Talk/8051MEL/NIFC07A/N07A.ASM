;WITH 51MR / 51ME LED VERSION

;Test program for ALS-NIFC-07A - polled mode

CONTROL EQU     2043H                   ;control port address for 8255
PORTA   EQU     2040H                   ;porta address for 8255
PORTB   EQU     2041H                   ;portb address for 8255
PORTC   EQU     2042H                   ;portb address for 8255
UPDD    EQU     677DH                   ;display routine addr in data field
TEMP	EQU	40H


                ORG     9000H
		
		MOV	DPTR,#CONTROL
		MOV	A,#90H			;PORT a I/P,  PORT b,c O/P
		MOVX	@DPTR,A

GET_NEXT:
                MOV TEMP,#00H
                MOV DPTR,#F000H
                MOVX A,@DPTR
                ANL A,#0FH
                MOV TEMP,A

		MOV	A,TEMP
		MOV	DPTR,#PORTC		;OUT PUT CH NO
		MOVX	@DPTR,A

                NOP
                NOP

		MOV	A,#0DH			;SET PC6 (OE)
		MOV	DPTR,#CONTROL
		MOVX	@DPTR,A

		MOV	DPTR,#CONTROL
		MOV	A,#0FH			;PC7 SET START\ALE
		MOVX	@DPTR,A

		MOV	R3,#30H			;30MSEC
LOP:		MOV	R4,#FFH
LOP1:		NOP
		nop
		DJNZ	R4,LOP1
		DJNZ	R3,LOP

		MOV	A,#0EH			;PC7 RESET
		MOVX	@DPTR,A
		NOP
		NOP

		MOV	DPTR,#CONTROL
		MOV	A,#0CH			;RESET PC6 TO READ EOC
		MOVX	@DPTR,A

AD2:		MOV	DPTR,#PORTA
		MOVX	A,@DPTR			;LO TO HI
		ANL	A,#80H
		JNB	ACC.7,AD2

		MOV	A,#0DH			;SET PC6 (OE)
		MOV	DPTR,#CONTROL
		MOVX	@DPTR,A

		MOV	DPTR,#PORTA		;READ DIGITAL	VALUE
		MOVX	A,@DPTR
		MOV	R6,A
		LCALL	UPDD

                SJMP    GET_NEXT                     ;LOOP BACK

		END
								
