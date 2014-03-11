
;WITH 51MR / 51ME LED VERSION

;Test program for ALS-NIFC-01 two phase on Anti Clock wise       

         org 9000H

        mov     a,#80h              ;8255 initialisation
        mov     dptr,#2043h         ;PC Cntrl address = 2043h    
	movx 	@dptr,a
start:  
        mov     a,#09h              ;phases b and c switched ON
        mov     dptr,#2042h
	movx 	@dptr,a
        lcall   delay
        mov     a,#03h              ;phases d and b switched ON
        mov     dptr,#2042h
	movx 	@dptr,a
        lcall   delay
        mov     a,#06h              ;phases a and d switched ON
        mov     dptr,#2042h
	movx 	@dptr,a
        lcall   delay
        mov     a,#0ch              ;phases c and a switched ON
        mov     dptr,#2042h
	movx 	@dptr,a
        lcall   delay
        sjmp    start               ;repeat the above procedure

delay:
        mov  r0,#f7h        ;delay subroutine    
oloop:  mov  r1,#ffh 
iloop:  djnz r1,iloop
	djnz r0,oloop
        ret

        end                                   
