;NIFC-06
;DUAL DAC AND OPTO I/O INTERFACE.


PORTCP                  EQU     2043H   ;8255 control port
					;address
PORTA                   EQU     2040H   ;port A address
PORTB                   EQU     2041H   ;port B address
PORTC                   EQU     2042H   ;port C address

****** STAIR CASE WAVE FORM ***********

        ORG     9000H
	       
	MOV	SP,#60H

    	MOV	DPTR,#PORTCP
	MOV	A,#80H		;initialise 8255
	MOVX	@DPTR,A		;port c high as o/p
START:  
	MOV	A,#00H	     ;initialise D to A i/p to 00h(min)
	LCALL	SUB	     ;output to both D to A	
	MOV	A,#3FH       ;initialise D to A i/p to 3fh(mid)
	LCALL	SUB	     ;output to both D to A	
	MOV	A,#7FH	     ;initialise D to A i/p to 7fh(mid))
	LCALL	SUB	     ;output to both D to A
        MOV     A,#BFH       ;initialise D to A i/p to Bfh(mid))
	LCALL	SUB	     ;output to both D to A	
        MOV     A,#FFH       ;initialise D to A i/p to ffh(max)
	LCALL	SUB	     ;output to both D to A	

	LJMP	START

SUB:
	MOV	DPTR,#PORTA
	MOVX	@DPTR,A
	MOV	DPTR,#PORTB
	MOVX	@DPTR,A
        PUSH R0
	PUSH R1
        MOV  R0,#06H         ;5 msecs delay
B2:	
        MOV  R1,#FFH
B1:	
	NOP
        DJNZ R1,B1
        DJNZ R0,B2
	POP R1
	POP R0
	RET
        
        END
