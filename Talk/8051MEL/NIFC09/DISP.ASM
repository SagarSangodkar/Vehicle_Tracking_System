CNTRL           EQU     2043H                ;CONTROL PORT ADDRESS OF  8255
PORTA           EQU     2040H                ;PORTA ADDRESS OF 8255 
PORTB           EQU     2041H                ;PORTB ADDRESS OF 8255
PORTC           EQU     2042H                ;PORTC ADDRESS OF 8255

        ORG     9000H

        MOV A,#90H
        MOV DPTR,#CNTRL
        MOVX @DPTR,A

        MOV     B,#20H             ;Blank all digits
BLNK2:  MOV     DPTR,#PORTB
	MOV	A,#FFH
	MOVX	@DPTR,A

	MOV	DPTR,#PORTC
	MOV	A,#00H         	  ;Clock the shift register
	MOVX	@DPTR,A

	MOV	A,#F0H
	MOVX	@DPTR,A

        DJNZ    B,BLNK2

BACK:
        MOV     A,#FEH

        MOV     B,#21H 
BLNK1:
        MOV     DPTR,#PORTB
	MOVX	@DPTR,A

	MOV	DPTR,#PORTC
	MOV	A,#00H         	  ;Clock the shift register
	MOVX	@DPTR,A

	MOV	A,#F0H
	MOVX	@DPTR,A

        LCALL   DELAY
        RL      A

	DJNZ	B,BLNK1

        SJMP    BACK

DELAY: 
        mov     r0,#f7h         ;DELAY SUBROUTINE
oloop:  mov     r1,#ffh 
iloop:  djnz    r1,iloop
	djnz 	r0,oloop
	ret
        
        END
