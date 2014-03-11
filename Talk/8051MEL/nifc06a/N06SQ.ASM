;NIFC-06
;DUAL DAC AND OPTO I/O INTERFACE.


PORTCP                  EQU     2043H   ;8255 control port
					;address
PORTA                   EQU     2040H   ;port A address
PORTB                   EQU     2041H   ;port B address
PORTC                   EQU     2042H   ;port C address

NEXT                    EQU     2CH     ;code for next key
DELAY			 		EQU	    684EH

;*******SQUARE WAVE GENERATION FROM DUAL DAC*********

        ORG 9000H
        
	MOV DPTR,#PORTCP
	MOV A,#80H
	MOVX @DPTR,A
BEGIN:	
	MOV A,#00H
	LCALL SUBR
	MOV A,#FFH
	LCALL SUBR
	LJMP BEGIN
SUBR:
	MOV DPTR,#PORTA
	MOVX @DPTR,A
	MOV DPTR,#PORTB
	MOVX @DPTR,A
	PUSH R0
	PUSH R1
	MOV R0,#06H
SB2:	
	MOV R1,#FFH
SB1:
	NOP
	DJNZ R1,SB1
	DJNZ R0,SB2
	POP R1
	POP R0
	RET

        END         
