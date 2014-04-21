(define add (lambda (x)
              (lambda (y)
                (+ x y))))

(define add3 (add 3))

(add3 7)
