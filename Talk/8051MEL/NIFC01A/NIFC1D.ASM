;WITH 51MR / 51ME LED VERSION

;Test program for ALS-NIFC-01 half step Anticlock wise       

         org 9000H

        mov     a,#80h             ;8255 initialisation
        mov     dptr,#2043h        ;PC Cntrl address = 2043h     
	movx 	@dptr,a

        mov     a,#0dh             ;phase c switched ON
        mov     dptr,#2042h        ;PC Data address = 2042h
	movx 	@dptr,a
        lcall   delay
        lcall   delay
        mov     a,#09h             ;phases c and b switched ON
        mov     dptr,#2042h
	movx 	@dptr,a
        lcall   delay
        lcall   delay
        mov     a,#0bh             ;phase b switched ON
        mov     dptr,#2042h
	movx 	@dptr,a
        lcall   delay
        lcall   delay
        mov     a,#03h             ;phases b and d switched ON
        mov     dptr,#2042h
	movx 	@dptr,a
        lcall   delay
        lcall   delay
        mov     a,#07h             ;phase d switched ON
        mov     dptr,#2042h
	movx 	@dptr,a
        lcall   delay
        lcall   delay
        mov     a,#06h             ;phases d and a switched ON
        mov     dptr,#2042h
	movx 	@dptr,a
        lcall   delay
        lcall   delay
        mov     a,#0eh             ;phase a switched ON
        mov     dptr,#2042h
	movx 	@dptr,a
        lcall   delay
        lcall   delay
        mov     a,#0ch             ;phases a and c switched ON
        mov     dptr,#2042h
	movx 	@dptr,a
        call   delay 
        lcall   delay 

        lcall 0003h


delay: 
        mov  r0,#f7h        ;delay subroutine    
oloop:  mov  r1,#ffh 
iloop:  djnz r1,iloop
	djnz r0,oloop
        ret

        end
