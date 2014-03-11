;++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
;      PROGRAM FOR KEYBOARD DISPLAY   
;+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


CNTRL           EQU     2043H                ;CONTROL PORT ADDRESS OF  8255
PORTA           EQU     2040H                ;PORTA ADDRESS OF 8255 
PORTB           EQU     2041H                ;PORTB ADDRESS OF 8255
PORTC           EQU     2042H                ;PORTC ADDRESS OF 8255

KEY_CD          EQU     B000H
                                    
        ORG     9000H

        MOV A,#90H
        MOV DPTR,#CNTRL
        MOVX @DPTR,A

BLNK:   MOV     B,#20H             ;Blank all digits
BLNK1:	MOV	DPTR,#PORTB
	MOV	A,#FFH
	MOVX	@DPTR,A

	MOV	DPTR,#PORTC
	MOV	A,#00H         	  ;Clock the shift register
	MOVX	@DPTR,A

	MOV	A,#F0H
	MOVX	@DPTR,A

	DJNZ	B,BLNK1

        MOV A,#00H
        MOV DPTR,#KEY_CD
        MOVX @DPTR,A             ;CLEAR THE KEY CODE LOCATION

START:  LCALL SCAN                ;SCAN THE KEYBOARD & GET THE

        MOV R0,A

        CLR A                  ;Clear accumulator
			
        MOV DPTR,#KEY_CD
        MOVX A,@DPTR            ;clear last key flag

        CALL DISP               ;display it

        SJMP START               ;DISPLAY IT

SCAN:                                 ;KEYBOARD ROUTINE
        MOV R5,#00H                              ;OUTPUT:-KEY CODE IN ACC
        MOV A,#07H               ;ENABLE A
        MOV DPTR,#PORTC
        MOVX @DPTR,A

BK:
        MOV DPTR,#PORTA
        MOVX A,@DPTR

        CJNE A,#00H,L1
        SJMP BK
L1:
        LCALL DELAY               ;DEBOUNCE

        MOV DPTR,#PORTA
        MOVX A,@DPTR

        CJNE A,#00H,L2
        SJMP BK
L2:
        MOV R5,#00H
        MOV A,#01H               ;ENABLE 1 ROW
        MOV R7,A
        MOV R6,#00H

REV:
        MOV DPTR,#PORTC
        MOVX @DPTR,A
        
        MOV DPTR,#PORTA
        MOVX A,@DPTR

        CJNE A,#00H,L3
        SJMP L4                ;YES-FIND THE KEY
L3:
        SJMP NEXT
L4:
        MOV A,R6                 ;IF NO-CHECK NEXT ROW
        ADD A,#08H

        MOV R6,A
        MOV A,R7
        RL A
        MOV R7,A
        CJNE A,#08H,L5
        SJMP SCAN
L5:
        SJMP REV

NEXT:   CLR C
        RRC A
        JC  FND
        INC R5
        SJMP NEXT

FND:
        MOV A,R7
        CJNE A,#01H,L6
        MOV A,R5
        SJMP L7
L6:
        CJNE A,#02H,L8
        MOV A,R5                 ;GET THE KEY CODE IN ACC
        ADD A,#08H
        MOV R5,A
        SJMP L7
L8:
        MOV A,R5
        ADD A,#10H
        MOV R5,A
L7:
        RET  

DELAY:
        MOV R2,#0FFH
L9:     MOV R1,#0FFH
L10:    DJNZ R1,L10
        DJNZ R2,L9
        RET

;Display routine - displays the code & set the key flag
;Input key code in reg R0

DISP:	MOV	A,R0			
	MOV	DPTR,#KEY_CD
	MOVX	@DPTR,A
	MOV	DPTR,#DISP_LOOKUP_TBL   ;lookup table for		
				        ;display
	RLC	A			;multiply by 4
	RLC	A
	ADD	A,DPL
	MOV	DPL,A
	JNC	DISP0
	MOV	A,DPH
	INC	A
	MOV	DPH,A

DISP0:	MOV	B,#04H			  ;number of digits
DISP1:	MOV	R4,#08H		          ;no. of segments per digit
	MOVX	A,@DPTR		          ;get code for display
	PUSH	DPH
	PUSH	DPL		

DISP2:	MOV	DPTR,#PORTB
	MOVX	@DPTR,A		          ;send data serially
	PUSH	A
	MOV	A,#00H		        ;clock the shift register
	MOV	DPTR,#PORTC
	MOVX	@DPTR,A
	MOV	A,#F0H
	MOVX	@DPTR,A

	DJNZ	R4,$2		       ;is it the last segment
	SJMP	DISP3		       ;yes,go to the next digit

$2:	POP	A		            ;retrieve bit pattern
	RRC	A		            ;next segment
	LJMP	DISP2

DISP3:	POP	A
	DJNZ	B,$3		           ;all digits over ?
	SJMP	DONE		           ;yes, sense next key

$3:	POP	DPL		           ;NO,next digit
	POP	DPH
	INC	DPTR
	LJMP	DISP1
			
DONE:	POP	DPL
	POP	DPH
	MOV	DPTR,#KEY_CD	      ;set key flag
	MOVX	A,@DPTR
	
;        CALL    CHK_FLG
	MOV	A,#FFH
	MOVX	@DPTR,A
	RET

        ORG A000H
DISP_LOOKUP_TBL:	
			DB	03H		;CODE FOR 0
			DB	03H		;0
			DB	FFH		;BLANK
			DB	FFH		;BLANK
			DB	9FH		;1
			DB	03H		;0
			DB	FFH		;BLANK
			DB	FFH		;BLANK
			DB	25H		;2
			DB	03H		;0
			DB	FFH		;BLANK
			DB	FFH		;BLANK
			DB	0DH		;3
			DB	03H		;0
			DB	FFH		;BLANK
			DB	FFH		;BLANK
			DB	99H		;4
			DB	03H		;0
			DB	FFH		;BLANK
			DB	FFH		;BLANK
			DB	49H		;5
			DB	03H		;0
			DB	FFH		;BLANK
			DB	FFH		;BLANK
			DB	41H		;6
			DB	03H		;0
			DB	FFH		;BLANK
			DB	FFH		;BLANK
			DB	1FH		;7
			DB	03H		;0
			DB	FFH		;BLANK
			DB	FFH		;BLANK
			DB	01H		;8
			DB	03H		;0
			DB	FFH		;BLANK
			DB	FFH		;BLANK
			DB	09H		;9
			DB	03H		;0
			DB	FFH		;BLANK
			DB	FFH		;BLANK
			DB	11H		;A
			DB	03H		;0
			DB	FFH		;BLANK
			DB	FFH		;BLANK
			DB	C1H		;B
			DB	03H		;0
			DB	FFH		;BLANK
			DB	FFH		;BLANK
			DB	63H		;C
			DB	03H		;0
			DB	FFH		;BLANK
			DB	FFH		;BLANK
			DB	85H		;D
			DB	03H		;0
			DB	FFH		;BLANK
			DB	FFH		;BLANK
			DB	61H		;E
			DB	03H		;0
			DB	FFH		;BLANK
			DB	FFH		;BLANK
			DB	71H		;F
			DB	03H		;0
			DB	FFH		;BLANK
			DB	FFH		;BLANK
			DB	03H		;0
			DB	9FH		;1
			DB	FFH		;BLANK
			DB	FFH		;BLANK
			DB	9FH		;1
			DB	9FH		;1
			DB	FFH		;BLANK
			DB	FFH		;BLANK
			DB	25H		;2
			DB	9FH		;1
			DB	FFH		;BLANK
			DB	FFH		;BLANK
			DB	0DH		;3
			DB	9FH		;1
			DB	FFH		;BLANK
			DB	FFH		;BLANK

        END

