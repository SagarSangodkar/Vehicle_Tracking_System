;WITH SDA-31/51/LED VERSION

;TEST PROGRAM FOR ALS-NIFC-17
;This program can be entered in the RAM location
;9000H and execute the program using GO command.

req	 	equ	35h
preq		equ	36h
freq		equ	37h
cntl    	equ     2043h
porta   	equ     2040h
portb   	equ     2041h
portc   	equ     2042h
delay           equ     6850h

        org 9000h

	mov  dptr,#cntl
	mov a,#82h
        movx @dptr,a            ;portA i/p,portC, portb  as o/p port
	mov dptr,#porta
	mov	a,#0fh
	movx	@dptr,a	  	;turn off all request leds
	mov	a,#f0h
	movx	@dptr,a
	mov	freq,#f0h	
next:
;************************************************
;READING THE REQUEST OF GROUND FLOOR
;from GND floor look for all possible combinations of requests
;i.e requests from 1 or 2 or 3 floor (gnd floor also)
;********************************************

	mov	a,freq
	cjne	a,#f0h,nextp
	mov	dptr,#portb	 ;reading the request status
	movx	a,@dptr
	anl	a,#0fh		
	mov	req,a
        NOP
        NOP
	cjne	a,#0eh,nextp	 ;is it gnd to gnd floor request
	lcall   floor1	         ;(yes)then loop back
	sjmp	next
nextp:  
	mov	a,req
        NOP
        NOP
	cjne	a,#0dh,next1	 ;is it gnd to first floor request
	mov	preq,#f0h
	mov	freq,#f3h
	lcall  movup		 ;blink from gnd to 1 floor
	nop
	lcall floor2

next1:
	mov	a,req
        NOP
        NOP
	cjne	a,#0bh,next2	  ;is it gnd to second floor request
	mov	preq,#f0h
	mov	freq,#f6h		
	lcall  movup		    ;blink from gnd to 2 floor
	nop
	lcall  floor3

next2:	mov	a,req
        NOP
        NOP
	cjne a,#07h,next3	   ;is it gnd to 3 floor request
	mov	preq,#f0h
	mov	freq,#f9h
	lcall  movup	        ;blink from gnd to 3 floor
	nop
	lcall floor4		

;************************************************
;READING THE REQUEST OF FIRST FLOOR
;from FIRST floor look for all possible combinations of requests
;i.e requests from GND or 2 or 3 floor (from first floor also)
;********************************************		
next3:
	mov	a,freq
        NOP
        NOP
	cjne	a,#f3h,next4
        mov	dptr,#portb
        movx	a,@dptr
        anl	a,#0fh
        mov	req,a
        NOP
        NOP
        cjne	a,#0eh,next5	  ;is it 1 to gnd floor request
        mov	preq,#f3h
        mov	freq,#f0h
        lcall movdown		  ;blink from 1 to gnd floor
        lcall  floor1

next5:
	mov	a,req
        NOP
        NOP
	cjne	a,#0dh,next6	  ;if request from 1 to 1 floor
				  ; then loop back
	lcall	floor2
	ljmp	next3
next6:
	mov	a,req
        NOP
        NOP
	cjne	a,#0bh,next7	  ;is it 1 to 2 floor request
	mov	preq,#f3h
	mov	freq,#f6h	
	lcall  movup		  ;blink the led from 1 to 2 floor
	lcall floor3
	mov	freq,#f6h

next7:	
	mov	a,req		  ;is it 1 to 3 floor request
        NOP
        NOP
	cjne	a,#07h,next4
	mov	preq,#f3h
	mov	freq,#f9h	
	lcall movup	       ;blink the led from 1 to 3 floor
	lcall  floor4

;************************************************
;READING THE REQUEST OF SECOND FLOOR
;from SECOND floor look for all possible combinations of requests
;i.e requests from GND or 2 or 3 floor (from second floor also)
;********************************************		
next4:	
	mov	a,freq
        NOP
        NOP
	cjne	a,#f6h,next8
	mov	dptr,#portb
	movx	a,@dptr
	anl	a,#0fh
	mov	req,a
        NOP
        NOP
	cjne	a,#0eh,next9		;if 2 to gnd floor request
	mov	preq,#f6h
	mov	freq,#f0h
	lcall  movdown	
	lcall  floor1
next9:	
	mov	a,req
        NOP
        NOP
	cjne	a,#0dh,nexta		;is 2 to first floor request
	mov	preq,#f6h
	mov	freq,#f3h	
	lcall  movdown
	lcall  floor2
	ljmp	next3	

nexta:	
	mov	a,req
        NOP
        NOP
	cjne	a,#0bh,nextb	     ;if request from 2 to 2 floor 
				     ;then loop back
	lcall  floor3
	sjmp	next4
nextb:	
	mov	a,req
        NOP
        NOP
	cjne	a,#07h,next8
	mov	preq,#f6h
	mov	freq,#f9h	
	lcall  movup
	lcall  floor4	

;************************************************
;READING THE REQUEST OF third FLOOR
;from THIRD floor look for all possible combinations of requests
;i.e requests from GND 1 or 2 or 3 floor	(from third floor also)
;********************************************		
next8:	mov	a,freq
	cjne	a,#f9h,ende
	mov	dptr,#portb
	movx	a,@dptr
	anl	a,#0fh
	mov	req,a
        NOP
        NOP
	cjne	a,#0eh,nexte		;if 3 to gnd floor request
	mov	preq,#f9h
	mov	freq,#f0h
	lcall  movdown	
	lcall	floor1

nexte:	
	mov	a,req
        NOP
        NOP
	cjne	a,#0dh,nextf		;is 3 to first floor request
	mov	preq,#f9h
	mov	freq,#f3h	
	lcall  movdown
	lcall floor2
	ljmp	next3	

nextf:	
	mov	a,req
        NOP
        NOP
	cjne	a,#0bh,nextg		;is 3 to 2 floor request
	mov	preq,#f9h
	mov	freq,#f6h	
	lcall  movdown
	lcall  floor3
	ljmp	next3
nextg:
	mov	a,req
        NOP
        NOP
	cjne	a,#07h,ende		;if request from 3 to 3 floor
					;then loop back
	lcall  floor3
ende:	
	ljmp	next
;********************************************************************
floor1:	mov	dptr,#porta	     ;to glow ground floor request led
       	mov	a,#e0h
     	movx	@dptr,a
        mov     r0,#99h
        mov     r1,#99h
      lcall delay
      lcall  delay
        ret


floor2:	mov	dptr,#porta	    ;to glow first floor request led 
        mov	a,#d3h
        movx	@dptr,a
        mov     r0,#99h
        mov     r1,#99h
        lcall  delay
        lcall  delay
l
        ret

floor3:	mov	dptr,#porta	   ;to glow second floor request led
        mov	a,#b6h
        movx	@dptr,a
        mov     r0,#99h
        mov     r1,#99h
        lcall  delay
        lcall  delay
        ret

floor4:	mov	dptr,#porta	   ;to glow third floor request led
        mov	a,#79h
        movx	@dptr,a
        mov     r0,#99h
        mov     r1,#99h
        lcall  delay
        lcall  delay
        ret			

;**********************************
;ELEVATOR UP			        ;to glow leds from down to up

movup:	mov	r5,preq
loop1:  mov     r0,#50h
        mov     r1,#20h
        lcall  delay
        lcall  delay        
        mov    dptr,#porta
        mov    a,r5
        movx   @dptr,a
        inc    r5
        mov    r0,#50h
        mov    r1,#20h
        lcall  delay
        lcall  delay
        mov    a,r5

        cjne   a,freq,loop1
        ret
;*****************************************	

movdown:  mov	r5,preq		   ;to glow led from up to down
loop2:    mov   r0,#50h
          mov   r1,#20h
	  lcall  delay
          lcall  delay
	  mov	dptr,#porta
	  mov	a,r5
	  movx	@dptr,a
	  dec	r5
          mov   r0,#50h
          mov   r1,#20h
	  lcall   delay
          lcall   delay
     	  mov	a,r5

	  cjne	a,freq,loop2
	  ret

	  end
		
