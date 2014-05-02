(define add (lambda (x)
              (lambda (y)
                (+ x y))))

(define add-5 (add 5))

(add-5 67)
