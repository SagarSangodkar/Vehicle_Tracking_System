;NIFC-06
;DUAL DAC AND OPTO I/O INTERFACE.


PORTCP                  EQU     2043H   ;8255 control port
					;address
PORTA                   EQU     2040H   ;port A address
PORTB                   EQU     2041H   ;port B address
PORTC                   EQU     2042H   ;port C address

******* RAMP WAVEFORM GENERATION ***********

        ORG     9000H
	       
    	MOV	DPTR,#PORTCP
	MOV	A,#80H		;initialise 8255
	MOVX	@DPTR,A		;port c high as o/p

START:
	MOV	R4,#FFH
	MOV	A,#00H	      ;initialise temp.reg to 00H
A2:	
	MOV	DPTR,#PORTA   ;o/p to both D to A
	MOVX	@DPTR,A
	MOV	DPTR,#PORTB
	MOVX	@DPTR,A
	INC	A	      ;increment the digital code
        NOP
        NOP
	DJNZ	R4,A2
	LJMP	START

        END
