import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { DropdownMenuSeparator } from '../components/ui/dropdown-menu';
import { DropdownMenuLabel } from '../components/ui/dropdown-menu';
import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '../components/ui/dropdown-menu';
import { HiOutlineSearch } from 'react-icons/hi';
import Cart from '../components/Cart';

import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { setUser } from '@/redux/features/user/userSlice';
import { FormEvent, useState } from 'react';

import { Input } from '@/components/ui/input';
import {
  searchTerm,
  toggleState,
} from '@/redux/features/products/productSlice';

export default function Navbar() {
  const [inputValue, setInputValue] = useState<string>('');
  const { user } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    console.log('Logout');
    signOut(auth).then(() => {
      // Sign-out successful.
      dispatch(setUser(null));
    });
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(inputValue);
    dispatch(searchTerm(inputValue));
  };
  const handleChange = (event: any) => {
    setInputValue(event.target.value);
  };

  return (
    <nav className="w-full h-16 fixed top backdrop-blur-lg z-10">
      <div className="h-full w-full bg-white/60">
        <div className="flex items-center justify-between w-full md:max-w-7xl h-full mx-auto ">
          <div>
            <h1 className="text-xl font-bold">Book Market</h1>
          </div>
          <div>
            <ul className="flex items-center">
              <li>
                <form
                  className="flex gap-5 items-center"
                  onSubmit={handleSubmit}
                >
                  <Input
                    className="min-h-[30px]"
                    onChange={handleChange}
                    value={inputValue}
                  />
                  <Button
                    variant="ghost"
                    onClick={() => dispatch(toggleState())}
                  >
                    <Link to="/products">
                      <HiOutlineSearch size="25" />
                    </Link>
                  </Button>
                </form>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to="/">Home</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to="/products">Products</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to="/checkout">Checkout</Link>
                </Button>
              </li>

              <li>
                <Cart />
              </li>
              <li className="ml-5">
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      Profile
                    </DropdownMenuItem>
                    {!user.email && (
                      <>
                        <Link to="/login">
                          <DropdownMenuItem className="cursor-pointer">
                            Login
                          </DropdownMenuItem>
                        </Link>
                        <Link to="/signup">
                          <DropdownMenuItem className="cursor-pointer">
                            Sign up
                          </DropdownMenuItem>
                        </Link>
                      </>
                    )}
                    {user.email && (
                      <>
                        <Link to="/createBook">
                          <DropdownMenuItem className="cursor-pointer">
                            Add New Book
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem
                          onClick={handleLogout}
                          className="cursor-pointer"
                        >
                          Logout
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
